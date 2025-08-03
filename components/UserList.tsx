import type { User } from '@/lib/socket'

interface UserListProps {
  users: User[]
  votedUsers: Set<string>
  showResults: boolean
  currentUserId?: string
}

export default function UserList({
  users,
  votedUsers,
  showResults,
  currentUserId,
}: UserListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">参加者</h2>
      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className={`
              flex items-center justify-between p-3 rounded-lg
              ${user.id === currentUserId ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-medium">{user.name}</span>
              {user.id === currentUserId && (
                <span className="text-xs text-blue-600">(あなた)</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {showResults && user.vote && (
                <span className="text-lg font-bold text-gray-700">
                  {user.vote}
                </span>
              )}
              {!showResults && votedUsers.has(user.id) && (
                <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    role="img"
                    aria-label="投票済み"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showResults && users.length > 0 && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-2">統計</h3>
          <div className="text-sm text-gray-600">
            <p>平均: {calculateAverage(users)}</p>
            <p>最高: {calculateMax(users)}</p>
            <p>最低: {calculateMin(users)}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function calculateAverage(users: User[]): string {
  const numericVotes = users
    .filter((u) => u.vote && u.vote !== '?')
    .map((u) => parseInt(u.vote as string))

  if (numericVotes.length === 0) return '-'

  const avg =
    numericVotes.reduce((sum, vote) => sum + vote, 0) / numericVotes.length
  return avg.toFixed(1)
}

function calculateMax(users: User[]): string {
  const numericVotes = users
    .filter((u) => u.vote && u.vote !== '?')
    .map((u) => parseInt(u.vote as string))

  if (numericVotes.length === 0) return '-'

  return Math.max(...numericVotes).toString()
}

function calculateMin(users: User[]): string {
  const numericVotes = users
    .filter((u) => u.vote && u.vote !== '?')
    .map((u) => parseInt(u.vote as string))

  if (numericVotes.length === 0) return '-'

  return Math.min(...numericVotes).toString()
}
