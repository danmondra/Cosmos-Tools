import { Constellation } from '~/components/constellation'

import constellations from '~/data/constellations'

export function Constellations() {
  return (
    <section className='constellations'>
      {constellations.map(({ name, id, description, stars }) => (
        <Constellation
          key={id}
          name={name}
          id={id}
          description={description}
          stars={stars}
        />
      ))}
    </section>

  )
}
