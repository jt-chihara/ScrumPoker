//! Core domain models and helper logic for scrum poker sessions.

use serde::{Deserialize, Serialize};
use serde_with::skip_serializing_none;
use thiserror::Error;

#[skip_serializing_none]
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct User {
    pub id: String,
    pub name: String,
    #[serde(default)]
    pub vote: Option<String>,
    #[serde(default)]
    pub is_spectator: Option<bool>,
}

impl User {
    pub fn new(id: impl Into<String>, name: impl Into<String>) -> Self {
        Self {
            id: id.into(),
            name: name.into(),
            vote: None,
            is_spectator: None,
        }
    }

    pub fn clear_vote(&mut self) {
        self.vote = None;
    }

    pub fn set_vote(&mut self, vote: impl Into<String>) {
        self.vote = Some(vote.into());
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
pub struct Room {
    pub id: String,
    #[serde(default)]
    pub users: Vec<User>,
    pub is_voting: bool,
    pub show_results: bool,
}

impl Room {
    pub fn new(id: impl Into<String>) -> Self {
        Self {
            id: id.into(),
            users: Vec::new(),
            is_voting: true,
            show_results: false,
        }
    }

    pub fn add_user(&mut self, user: User) -> RoomResult<()> {
        if self.users.iter().any(|u| u.id == user.id) {
            return Err(RoomError::UserAlreadyExists);
        }
        self.users.push(user);
        Ok(())
    }

    pub fn remove_user(&mut self, user_id: &str) -> Option<User> {
        let index = self.users.iter().position(|u| u.id == user_id)?;
        Some(self.users.remove(index))
    }

    pub fn user_mut(&mut self, user_id: &str) -> RoomResult<&mut User> {
        self.users
            .iter_mut()
            .find(|user| user.id == user_id)
            .ok_or(RoomError::UserNotFound)
    }

    pub fn record_vote(&mut self, user_id: &str, vote: &str) -> RoomResult<()> {
        let user = self.user_mut(user_id)?;
        user.set_vote(vote);
        Ok(())
    }

    pub fn reset_votes(&mut self) {
        for user in &mut self.users {
            user.clear_vote();
        }
        self.is_voting = true;
        self.show_results = false;
    }

    pub fn all_voted(&self) -> bool {
        !self.users.is_empty() && self.users.iter().all(|user| user.vote.is_some())
    }

    pub fn statistics(&self) -> VoteStatistics {
        VoteStatistics::from_users(&self.users)
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct VoteStatistics {
    pub average: Option<f64>,
    pub min: Option<i32>,
    pub max: Option<i32>,
    pub votes_count: usize,
}

impl VoteStatistics {
    pub fn from_users(users: &[User]) -> Self {
        let mut numeric_votes: Vec<i32> = users
            .iter()
            .filter_map(|user| user.vote.as_ref())
            .filter_map(|vote| vote.parse::<i32>().ok())
            .collect();

        numeric_votes.sort_unstable();

        if numeric_votes.is_empty() {
            return Self {
                average: None,
                min: None,
                max: None,
                votes_count: users.iter().filter(|user| user.vote.is_some()).count(),
            };
        }

        let sum: i32 = numeric_votes.iter().sum();
        let count = numeric_votes.len();
        let average = sum as f64 / count as f64;

        Self {
            average: Some(average),
            min: numeric_votes.first().copied(),
            max: numeric_votes.last().copied(),
            votes_count: users.iter().filter(|user| user.vote.is_some()).count(),
        }
    }
}

pub type RoomResult<T> = Result<T, RoomError>;

#[derive(Debug, Error, PartialEq, Eq)]
pub enum RoomError {
    #[error("user already exists in room")]
    UserAlreadyExists,
    #[error("user not found in room")]
    UserNotFound,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn statistics_ignore_question_mark_votes() {
        let mut room = Room::new("room");
        room.add_user(User {
            id: "1".into(),
            name: "A".into(),
            vote: Some("?".into()),
            is_spectator: None,
        })
        .unwrap();
        room.add_user(User {
            id: "2".into(),
            name: "B".into(),
            vote: Some("8".into()),
            is_spectator: None,
        })
        .unwrap();
        room.add_user(User {
            id: "3".into(),
            name: "C".into(),
            vote: Some("13".into()),
            is_spectator: None,
        })
        .unwrap();

        let stats = room.statistics();
        assert_eq!(stats.average, Some((8 + 13) as f64 / 2.0));
        assert_eq!(stats.min, Some(8));
        assert_eq!(stats.max, Some(13));
        assert_eq!(stats.votes_count, 3);
    }

    #[test]
    fn room_prevents_duplicate_users() {
        let mut room = Room::new("room");
        room.add_user(User::new("1", "A")).unwrap();
        assert_eq!(
            room.add_user(User::new("1", "duplicate")),
            Err(RoomError::UserAlreadyExists)
        );
    }

    #[test]
    fn record_vote_sets_vote() {
        let mut room = Room::new("room");
        room.add_user(User::new("1", "A")).unwrap();
        room.record_vote("1", "5").unwrap();
        let user = room.user_mut("1").unwrap();
        assert_eq!(user.vote.as_deref(), Some("5"));
    }
}
