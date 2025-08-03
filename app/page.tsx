'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const [userName, setUserName] = useState('')
  const [roomId, setRoomId] = useState('')
  const router = useRouter()

  const createRoom = () => {
    if (!userName) {
      alert('名前を入力してください')
      return
    }
    const newRoomId = Math.random().toString(36).substring(7)
    router.push(`/room/${newRoomId}?name=${encodeURIComponent(userName)}`)
  }

  const joinRoom = () => {
    if (!userName || !roomId) {
      alert('名前とルームIDを入力してください')
      return
    }
    router.push(`/room/${roomId}?name=${encodeURIComponent(userName)}`)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold text-center mb-8">
          スクラムポーカー
        </h1>

        <div className="mb-6">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            名前
          </label>
          <input
            id="userName"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="名前を入力"
          />
        </div>

        <div className="mb-6">
          <button
            type="button"
            onClick={createRoom}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            新しいルームを作成
          </button>
        </div>

        <div className="border-t pt-6">
          <label
            htmlFor="roomId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ルームID
          </label>
          <input
            id="roomId"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="ルームIDを入力"
          />
          <button
            type="button"
            onClick={joinRoom}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
          >
            ルームに参加
          </button>
        </div>
      </div>
    </div>
  )
}
