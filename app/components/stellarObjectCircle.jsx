export function StellarObjectCircle({ star }) {
  const { color, shadow } = star

  return (
    <svg
      viewBox='0 0 100 100'
      xmlns='http://www.w3.org/2000/svg'
      className='star'
      style={{
        fill: color,
        filter: `drop-shadow(0 0 6px ${shadow})`,
        maxHeight: '15rem'
      }}
    >
      <circle cx='50' cy='50' r='50' />
    </svg>
  )
}
