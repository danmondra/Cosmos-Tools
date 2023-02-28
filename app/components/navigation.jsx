import constellations from '~/data/constellations'

export function Navigation({ constellation, setConstellation }) {
  const handleClick = (e) => {
    const constellationSelected = e.target.dataset.constellation

    const positionConstellation = document.querySelector(`#${constellationSelected}`).offsetLeft
    const constellationsGrid = document.querySelector('.constellations')

    constellationsGrid.scrollTo({ left: positionConstellation, behavior: 'smooth' })

    setConstellation(constellationSelected)
  }

  return (
    <nav className='navigation'>
      {constellations.map(({ id, rol }) => (
        <button
          key={`navigationBtn${id}`}
          className={`${constellation === id ? 'navigationBtnActive' : ''} navigationBtn`}
          data-constellation={id}
          onClick={handleClick}
        >
          {rol}
        </button>
      ))}
    </nav>
  )
}
