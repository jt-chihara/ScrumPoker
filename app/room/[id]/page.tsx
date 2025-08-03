'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'
import PokerCard from '@/components/PokerCard'
import UserList from '@/components/UserList'
import type { User } from '@/lib/socket'

const CARD_VALUES = ['0', '1', '2', '3', '5', '8', '13', '21', '?']

export default function RoomPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const roomId = params?.id as string
  const userName = searchParams?.get('name') || 'Anonymous'

  const [socket, setSocket] = useState<Socket | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [votedUsers, setVotedUsers] = useState<Set<string>>(new Set())

  useEffect(() => {
    const socketInstance = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000',
    )

    socketInstance.emit('join-room', { roomId, userName })

    socketInstance.on('room-state', (room) => {
      setUsers(room.users)
      setShowResults(room.showResults)
    })

    socketInstance.on('users-update', (updatedUsers: User[]) => {
      setUsers(updatedUsers)
    })

    socketInstance.on('user-voted', ({ userId }: { userId: string }) => {
      setVotedUsers((prev) => new Set([...prev, userId]))
    })

    socketInstance.on('results-shown', (usersWithVotes: User[]) => {
      setUsers(usersWithVotes)
      setShowResults(true)
    })

    socketInstance.on('votes-reset', () => {
      setSelectedCard(null)
      setShowResults(false)
      setVotedUsers(new Set())
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [roomId, userName])

  const handleCardSelect = (value: string) => {
    if (!socket || showResults) return

    setSelectedCard(value)
    socket.emit('vote', { roomId, vote: value })
  }

  const handleShowResults = () => {
    if (!socket) return
    socket.emit('show-results', { roomId })
  }

  const handleReset = () => {
    if (!socket) return
    socket.emit('reset-votes', { roomId })
  }

  const allUsersVoted =
    users.length > 0 &&
    users.filter((u) => !u.isSpectator).every((u) => votedUsers.has(u.id))

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">スクラムポーカー</h1>
          <p className="text-gray-600">ルームID: {roomId}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">カードを選択</h2>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mb-6">
                {CARD_VALUES.map((value) => (
                  <PokerCard
                    key={value}
                    value={value}
                    selected={selectedCard === value}
                    onClick={() => handleCardSelect(value)}
                    disabled={showResults}
                  />
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleShowResults}
                  disabled={!allUsersVoted || showResults}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  結果を表示
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  リセット
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <UserList
              users={users}
              votedUsers={votedUsers}
              showResults={showResults}
              currentUserId={socket?.id}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
