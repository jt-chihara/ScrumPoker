interface PokerCardProps {
  value: string
  selected?: boolean
  onClick?: () => void
  disabled?: boolean
}

export default function PokerCard({
  value,
  selected,
  onClick,
  disabled,
}: PokerCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-full aspect-2/3 rounded-lg border-2 transition-all duration-200
        ${
          selected
            ? 'border-blue-500 bg-blue-50 scale-105 shadow-lg'
            : 'border-gray-300 bg-white hover:border-gray-400 hover:shadow-md'
        }
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        flex items-center justify-center
      `}
    >
      <span
        className={`text-3xl font-bold ${selected ? 'text-blue-600' : 'text-gray-700'}`}
      >
        {value}
      </span>
    </button>
  )
}
