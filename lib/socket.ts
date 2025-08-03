import type { Server as HTTPServer } from 'node:http'
import { Server as SocketIOServer } from 'socket.io'

export interface User {
  id: string
  name: string
  vote?: string
  isSpectator?: boolean
}

export interface Room {
  id: string
  users: User[]
  isVoting: boolean
  showResults: boolean
}

let io: SocketIOServer

const rooms: Map<string, Room> = new Map()

export const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? false
          : ['http://localhost:3000'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on(
      'join-room',
      ({ roomId, userName }: { roomId: string; userName: string }) => {
        socket.join(roomId)

        if (!rooms.has(roomId)) {
          rooms.set(roomId, {
            id: roomId,
            users: [],
            isVoting: false,
            showResults: false,
          })
        }

        const room = rooms.get(roomId)
        if (!room) return
        const user: User = {
          id: socket.id,
          name: userName,
        }

        room.users.push(user)

        socket.to(roomId).emit('user-joined', user)
        socket.emit('room-state', room)
        io.to(roomId).emit('users-update', room.users)
      },
    )

    socket.on('vote', ({ roomId, vote }: { roomId: string; vote: string }) => {
      const room = rooms.get(roomId)
      if (!room) return

      const user = room.users.find((u) => u.id === socket.id)
      if (user) {
        user.vote = vote
        io.to(roomId).emit('user-voted', { userId: socket.id })
      }
    })

    socket.on('show-results', ({ roomId }: { roomId: string }) => {
      const room = rooms.get(roomId)
      if (!room) return

      room.showResults = true
      io.to(roomId).emit('results-shown', room.users)
    })

    socket.on('reset-votes', ({ roomId }: { roomId: string }) => {
      const room = rooms.get(roomId)
      if (!room) return

      room.users.forEach((user) => {
        user.vote = undefined
      })
      room.showResults = false

      io.to(roomId).emit('votes-reset')
      io.to(roomId).emit('users-update', room.users)
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)

      rooms.forEach((room, roomId) => {
        const userIndex = room.users.findIndex((u) => u.id === socket.id)
        if (userIndex !== -1) {
          const user = room.users[userIndex]
          room.users.splice(userIndex, 1)
          io.to(roomId).emit('user-left', user)
          io.to(roomId).emit('users-update', room.users)

          if (room.users.length === 0) {
            rooms.delete(roomId)
          }
        }
      })
    })
  })

  return io
}
