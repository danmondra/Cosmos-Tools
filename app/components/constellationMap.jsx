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
        <div
          key={`starMap${star.id}`}
          className='starBtn'
          data-star={star.id}
          style={{
            top: star.position.top,
            left: star.position.left,
            width: star.width
          }}
        >
          <Link
            to={star.url}
            className={`starBtnLink ${star?.disable ? 'stellarObjectDisabled' : ''}`}
            style={{
              filter: `drop-shadow(0 0 10px ${star.shadow})`
            }}
          >
            <StellarObjectCircle
              star={star}
            />
            {star.name}
          </Link>
          <p className='starDescriptionLarge'>
            {star.largeDescription}
            <span className='starDescriptionShort'>{star.description}</span>
          </p>
        </div>
      ))}
    </div>
  )
}
