import { FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { generateRoomId } from '../utils/room'

export default function HomePage() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [roomId, setRoomId] = useState('')
  const [error, setError] = useState<string | null>(null)

  const canCreateRoom = useMemo(() => userName.trim().length > 0, [userName])
  const canJoinRoom = useMemo(
    () => userName.trim().length > 0 && roomId.trim().length > 0,
    [roomId, userName],
  )

  const navigateToRoom = (targetRoomId: string) => {
    const sanitizedName = userName.trim()
    const sanitizedRoomId = targetRoomId.trim().toUpperCase()
    navigate(`/room/${sanitizedRoomId}?name=${encodeURIComponent(sanitizedName)}`)
  }

  const handleCreateRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canCreateRoom) {
      setError('名前を入力してください')
      return
    }
    const newRoomId = generateRoomId()
    setError(null)
    navigateToRoom(newRoomId)
  }

  const handleJoinRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!canJoinRoom) {
      setError('名前とルームIDを入力してください')
      return
    }
    setError(null)
    navigateToRoom(roomId)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-10 px-6 py-16">
      <header className="text-center">
        <p className="text-sm font-medium text-brand-600">Remote Planning Poker</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          スクラムポーカー
        </h1>
        <p className="mt-4 text-base text-slate-600">
          クラウドフレアWorkersとReactで構築されたリアルタイムなプランニングポーカー。
        </p>
      </header>

      <main className="grid w-full gap-8 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">ルームの作成</h2>
          <p className="mt-1 text-sm text-slate-500">新しいセッションを開始します。</p>
          <form className="mt-6 space-y-4" onSubmit={handleCreateRoom}>
            <label className="block text-sm font-medium text-slate-700" htmlFor="create-name">
              あなたの名前
            </label>
            <input
              id="create-name"
              name="create-name"
              autoComplete="off"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-base shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder="例: 田中 太郎"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:bg-brand-200"
              disabled={!canCreateRoom}
            >
              新しいルームを作成
            </button>
          </form>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">既存ルームへ参加</h2>
          <p className="mt-1 text-sm text-slate-500">
            既に共有されているルームIDを入力してください。
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleJoinRoom}>
            <label className="block text-sm font-medium text-slate-700" htmlFor="join-name">
              あなたの名前
            </label>
            <input
              id="join-name"
              name="join-name"
              autoComplete="off"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-base shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder="例: 田中 花子"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
            />
            <label className="block text-sm font-medium text-slate-700" htmlFor="room-id">
              ルームID
            </label>
            <input
              id="room-id"
              name="room-id"
              autoComplete="off"
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-base shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              placeholder="例: ABC123"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value.toUpperCase())}
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!canJoinRoom}
            >
              ルームに参加
            </button>
          </form>
        </section>
      </main>

      {error ? (
        <div className="w-full rounded-xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}
    </div>
  )
}
