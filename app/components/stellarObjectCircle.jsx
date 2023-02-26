export function StellarObjectCircle({ id }) {
  return (
    <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg' className='star' data-stellarObject={id}>
      <circle cx='50' cy='50' r='50' />
    </svg>
  )
}
