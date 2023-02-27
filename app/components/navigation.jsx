export function Navigation({ constellation, setConstellation }) {
  const handleClick = (e) => {
    const constellationSelected = e.target.dataset.constellation

    const positionConstellation = document.querySelector(`#${constellationSelected}`).offsetLeft
    const constellationsGrid = document.querySelector('.constellationsGrid')

    constellationsGrid.scrollTo({ left: positionConstellation, behavior: 'smooth' })

    setConstellation(constellationSelected)
  }

  return (
    <nav className='navigation'>
      <button
        className={`${constellation === 'images' ? 'active' : ''} navigationBtn`}
        data-constellation='images'
        onClick={handleClick}
      >
        Images
      </button>
      <button
        className={`${constellation === 'creators' ? 'active' : ''} navigationBtn`}
        data-constellation='creators'
        onClick={handleClick}
      >
        Creators
      </button>
      <button
        className={`${constellation === 'videos' ? 'active' : ''} navigationBtn`}
        data-constellation='videos'
        onClick={handleClick}
      >
        Videos
      </button>
    </nav>
  )
}
