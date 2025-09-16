//! Durable Object implementation responsible for managing room state.

use serde::Deserialize;
use worker::{console_log, durable_object, DurableObject, Env, Method, Request, Response, Result, State, WebSocket, WebSocketPair};

use crate::{
    messages::ServerMessage,
    models::{Room, RoomError, User},
};

const ROOM_STORAGE_KEY: &str = "room_state";

#[derive(Debug, Deserialize)]
struct JoinRequest {
    user_id: String,
    user_name: String,
}

#[derive(Debug, Deserialize)]
struct VoteRequest {
    user_id: String,
    vote: String,
}

#[derive(Debug, Deserialize)]
struct LeaveRequest {
    user_id: String,
}

#[durable_object]
pub struct RoomDurableObject {
    state: State,
    #[allow(dead_code)]
    env: Env,
    #[allow(clippy::vec_box)]
    connections: Vec<WebSocket>,
}

#[durable_object]
impl DurableObject for RoomDurableObject {
    fn new(state: State, env: Env) -> Self {
        Self { state, env, connections: Vec::new() }
    }

    async fn fetch(&mut self, req: Request) -> Result<Response> {
        let mut req = req;
        // WebSocket upgrade path: if Upgrade header is present, accept and attach to room
        if let Some(upgrade) = req.headers().get("Upgrade")? {
            if upgrade.eq_ignore_ascii_case("websocket") {
                console_log!("[DO:{}] WebSocket upgrade accepted", self.room_id());
                return self.handle_ws_upgrade();
            }
        }

        let method = req.method();
        let path = req.path();

        match path.as_str() {
            "/state" if method == Method::Get => self.handle_state().await,
            "/join" if method == Method::Post => {
                let payload: JoinRequest = req.json().await?;
                self.handle_join(payload).await
            }
            "/leave" if method == Method::Post => {
                let payload: LeaveRequest = req.json().await?;
                self.handle_leave(payload).await
            }
            "/vote" if method == Method::Post => {
                let payload: VoteRequest = req.json().await?;
                self.handle_vote(payload).await
            }
            "/show-results" if method == Method::Post => self.handle_show_results().await,
            "/reset" if method == Method::Post => self.handle_reset_votes().await,
            _ => Response::error("Not Found", 404),
        }
    }
}

impl RoomDurableObject {
    fn handle_ws_upgrade(&mut self) -> Result<Response> {
        let pair = WebSocketPair::new()?;
        let server = pair.server;
        let client = pair.client;
        server.accept()?;

        // Keep track of live connections in memory
        self.connections.push(server);

        // Send current room state to the newly connected client via HTTP upgrade response
        Response::from_websocket(client)
    }

    fn room_id(&self) -> String {
        self.state.id().to_string()
    }

    async fn load_room(&mut self) -> Result<Room> {
        match self.state.storage().get::<Room>(ROOM_STORAGE_KEY).await {
            Ok(room) => Ok(room),
            Err(_) => {
                let room = Room::new(self.room_id());
                self.state.storage().put(ROOM_STORAGE_KEY, &room).await?;
                Ok(room)
            }
        }
    }

    async fn save_room(&mut self, room: &Room) -> Result<()> {
        self.state
            .storage()
            .put(ROOM_STORAGE_KEY, room)
            .await
    }

    async fn delete_room(&mut self) -> Result<()> {
        self.state.storage().delete(ROOM_STORAGE_KEY).await?;
        Ok(())
    }

    async fn handle_state(&mut self) -> Result<Response> {
        let room = self.load_room().await?;
        // Also try to push current state to all connections
        let _ = self.broadcast(ServerMessage::RoomState { room: room.clone() });
        Self::json(ServerMessage::RoomState { room })
    }

    async fn handle_join(&mut self, payload: JoinRequest) -> Result<Response> {
        let mut room = self.load_room().await?;
        let user = User::new(payload.user_id, payload.user_name);
        match room.add_user(user) {
            Ok(()) => {
                room.is_voting = true;
                room.show_results = false;
                self.save_room(&room).await?;
                console_log!("[DO:{}] user joined: {}", self.room_id(), payload.user_id);
                let _ = self.broadcast(ServerMessage::UsersUpdate {
                    users: room.users.clone(),
                });
                Self::json(ServerMessage::RoomState { room })
            }
            Err(RoomError::UserAlreadyExists) => {
                Self::json(ServerMessage::error("user already exists"))
            }
            Err(err) => Self::json(ServerMessage::error(err.to_string())),
        }
    }

    async fn handle_leave(&mut self, payload: LeaveRequest) -> Result<Response> {
        let mut room = self.load_room().await?;
        if let Some(user) = room.remove_user(&payload.user_id) {
            if room.users.is_empty() {
                self.delete_room().await?;
            } else {
                if !room.show_results {
                    room.is_voting = true;
                }
                self.save_room(&room).await?;
            }
            console_log!("[DO:{}] user left: {}", self.room_id(), payload.user_id);
            let _ = self.broadcast(ServerMessage::UserLeft { user: user.clone() });
            Self::json(ServerMessage::UsersUpdate { users: room.users.clone() })
        } else {
            Self::json(ServerMessage::error("user not found"))
        }
    }

    async fn handle_vote(&mut self, payload: VoteRequest) -> Result<Response> {
        let mut room = self.load_room().await?;
        match room.record_vote(&payload.user_id, &payload.vote) {
            Ok(()) => {
                room.show_results = false;
                room.is_voting = true;
                self.save_room(&room).await?;
                if room.all_voted() {
                    console_log!("[DO:{}] all voted", self.room_id());
                    let _ = self.broadcast(ServerMessage::UsersUpdate { users: room.users.clone() });
                    Self::json(ServerMessage::UsersUpdate { users: room.users.clone() })
                } else {
                    console_log!("[DO:{}] user voted: {}", self.room_id(), payload.user_id);
                    let _ = self.broadcast(ServerMessage::UserVoted { user_id: payload.user_id.clone() });
                    Self::json(ServerMessage::UserVoted { user_id: payload.user_id })
                }
            }
            Err(err) => Self::json(ServerMessage::error(err.to_string())),
        }
    }

    async fn handle_show_results(&mut self) -> Result<Response> {
        let mut room = self.load_room().await?;
        if !room.all_voted() {
            return Self::json(ServerMessage::error("not all users have voted"));
        }
        room.show_results = true;
        room.is_voting = false;
        self.save_room(&room).await?;
        console_log!("[DO:{}] results shown", self.room_id());
        let msg = ServerMessage::ResultsShown { users: room.users.clone() };
        let _ = self.broadcast(msg.clone());
        Self::json(msg)
    }

    async fn handle_reset_votes(&mut self) -> Result<Response> {
        let mut room = self.load_room().await?;
        room.reset_votes();
        self.save_room(&room).await?;
        console_log!("[DO:{}] votes reset", self.room_id());
        let msg = ServerMessage::VotesReset;
        let _ = self.broadcast(msg.clone());
        Self::json(msg)
    }

    fn json(message: ServerMessage) -> Result<Response> {
        Response::from_json(&message)
    }

    fn broadcast(&mut self, message: ServerMessage) -> Result<()> {
        let payload = serde_json::to_string(&message).unwrap_or_else(|_| "{}".into());
        self.connections.retain(|ws| ws.send_with_str(&payload).is_ok());
        Ok(())
    }
}
