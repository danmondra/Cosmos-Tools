import { StellarObject } from '~/components/stellarObject'

export function StellarObjectsList({ constellation }) {
  return (
    <section className='stellarObjectsList'>

      {constellation.stars.map(star => (
        <StellarObject
          key={`listItem${star.id}`}
          star={star}
        />
      ))}
    </section>

  )
}
