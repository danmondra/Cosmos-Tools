import { ConstellationMap } from '~/components/constellationMap'

export function Constellation({ id, name, description, stars }) {
  return (
    <section className='constellation' id={id}>
      <h2 className='constellationName'>{name}</h2>
      <p className='constellationInfo'>{description}</p>
      <ConstellationMap
        id={id}
        stars={stars}
      />
    </section>

  )
}
