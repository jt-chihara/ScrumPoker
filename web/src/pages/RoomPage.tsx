import { useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

export default function RoomPage() {
  const navigate = useNavigate()
  const { id = '' } = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const userName = useMemo(() => searchParams.get('name') ?? '', [searchParams])

  if (!userName) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900">ルームに参加できませんでした</h1>
        <p className="text-slate-600">
          ユーザー名が指定されていないため、ルーム <span className="font-mono font-semibold">{id}</span> に参加できません。
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          ホームに戻る
        </button>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-slate-50 px-4 py-10">
      <header className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-slate-500">ルームID</p>
            <p className="font-mono text-xl font-semibold text-slate-900">{id}</p>
          </div>
          <div className="text-sm text-slate-600">
            参加ユーザー: <span className="font-semibold text-slate-900">{userName}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-6 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 text-center text-slate-500">
        <p className="text-lg font-medium text-slate-600">
          WebSocket連携と投票UIはこれから実装予定です。
        </p>
        <p className="text-sm">
          現時点ではナビゲーション確認用のプレースホルダー画面です。
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          ホームに戻る
        </button>
      </main>
    </div>
  )
}
