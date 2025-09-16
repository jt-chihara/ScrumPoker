export interface User {
  id: string
  name: string
  vote?: string
  isSpectator?: boolean | null
}

export interface Room {
  id: string
  users: User[]
  isVoting: boolean
  showResults: boolean
}

export interface VoteStatistics {
  average: number | null
  min: number | null
  max: number | null
  votesCount: number
}

export type ClientMessage =
  | { type: 'joinRoom'; roomId: string; userName: string }
  | { type: 'vote'; roomId: string; vote: string }
  | { type: 'showResults'; roomId: string }
  | { type: 'resetVotes'; roomId: string }
  | { type: 'leaveRoom'; roomId: string }
  | { type: 'ping' }

export type ServerMessage =
  | { type: 'roomState'; room: Room }
  | { type: 'usersUpdate'; users: User[] }
  | { type: 'userJoined'; user: User }
  | { type: 'userLeft'; user: User }
  | { type: 'userVoted'; userId: string }
  | { type: 'resultsShown'; users: User[] }
  | { type: 'votesReset' }
  | { type: 'error'; message: string }
  | { type: 'pong' }
