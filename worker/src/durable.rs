//! Durable Object implementation responsible for managing room state.

use worker::{durable_object, DurableObject, Env, Request, Response, Result, State};

use crate::{messages::ServerMessage, models::Room};

#[durable_object]
pub struct RoomDurableObject {
    state: State,
    env: Env,
}

#[durable_object]
impl DurableObject for RoomDurableObject {
    fn new(state: State, env: Env) -> Self {
        Self { state, env }
    }

    async fn fetch(&mut self, _req: Request) -> Result<Response> {
        Response::from_json(&ServerMessage::RoomState {
            room: Room::new("uninitialized"),
        })
    }
}
