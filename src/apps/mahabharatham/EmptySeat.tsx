export function EmptySeat() {
  return (
    <span className="frame-empty" aria-hidden="true">
      <svg className="seat-mark" viewBox="0 0 48 64">
        <circle cx="24" cy="16" r="8" />
        <path d="M8 62c2-16 8-24 16-24s14 8 16 24z" />
      </svg>
    </span>
  )
}
