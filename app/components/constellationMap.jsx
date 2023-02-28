import { Link } from '@remix-run/react'

import { StellarObjectCircle } from '~/components/stellarObjectCircle'
import { StarConnections } from '~/components/starConnections'

export function ConstellationMap({ id, stars }) {
  return (
    <div className='constellationMap'>
      <StarConnections
        id={id}
      />
      {stars.map((star) => (
        <Link
          to={star.url}
          className='starBtn'
          key={`starMap${star.id}`}
          style={{
            top: star.position.top,
            left: star.position.left,
            width: star.width,
            filter: `drop-shadow(0 0 10px ${star.shadow})`
          }}
        >
          <StellarObjectCircle
            star={star}
          />
          {star.name}
        </Link>
      ))}
    </div>
  )
}
