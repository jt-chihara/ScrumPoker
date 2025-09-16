//! JSON message payloads exchanged between clients and the worker.

use serde::{Deserialize, Serialize};

use crate::models::{Room, User};

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq, Eq)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum ClientMessage {
    JoinRoom { room_id: String, user_name: String },
    Vote { room_id: String, vote: String },
    ShowResults { room_id: String },
    ResetVotes { room_id: String },
    LeaveRoom { room_id: String },
    Ping,
}

impl ClientMessage {
    pub fn from_json_str(payload: &str) -> serde_json::Result<Self> {
        serde_json::from_str(payload)
    }
}

#[derive(Debug, Serialize, Deserialize, Clone, PartialEq)]
#[serde(tag = "type", rename_all = "camelCase")]
pub enum ServerMessage {
    RoomState { room: Room },
    UsersUpdate { users: Vec<User> },
    UserJoined { user: User },
    UserLeft { user: User },
    UserVoted { user_id: String },
    ResultsShown { users: Vec<User> },
    VotesReset,
    Error { message: String },
    Pong,
}

impl ServerMessage {
    pub fn error(message: impl Into<String>) -> Self {
        Self::Error {
            message: message.into(),
        }
    }

    pub fn to_json_string(&self) -> serde_json::Result<String> {
        serde_json::to_string(self)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn client_message_round_trips() {
        let json = r#"{"type":"joinRoom","roomId":"123","userName":"Alice"}"#;
        let parsed = ClientMessage::from_json_str(json).expect("json should parse");
        if let ClientMessage::JoinRoom { room_id, user_name } = parsed {
            assert_eq!(room_id, "123");
            assert_eq!(user_name, "Alice");
        } else {
            panic!("unexpected variant");
        }
    }

    #[test]
    fn server_message_serializes_to_camel_case() {
        let room = Room::new("room");
        let message = ServerMessage::RoomState { room };
        let json = message.to_json_string().expect("json serialization");
        assert!(json.contains("\"type\":\"roomState\""));
    }
}
