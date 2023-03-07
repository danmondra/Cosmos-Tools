import { Link } from '@remix-run/react'
import { StellarObjectCircle } from '~/components/stellarObjectCircle'

export function StellarObject({ star }) {
  const { name, description, url, id } = star

  function handleMouseOver(e) {
    const starDescriptionLarge = document.querySelector(`.starBtn[data-star='${e.currentTarget.dataset.star}'] .starDescriptionLarge`)
    starDescriptionLarge.classList.add('starDescriptionLargeActive')
  }

  function handleMouseLeave(e) {
    const starDescriptionLarge = document.querySelector(`.starBtn[data-star='${e.currentTarget.dataset.star}'] .starDescriptionLarge`)
    starDescriptionLarge.classList.remove('starDescriptionLargeActive')
  }

  return (
    <Link
      to={url}
      className={`stellarObject ${star?.disable ? 'stellarObjectDisabled' : ''}`}
      data-star={id}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <StellarObjectCircle star={star} />
      <div className='infoObject'>
        <h3 className='nameObject'>{name}</h3>
        <p className='nameTool'>{description}</p>
      </div>
    </Link>
  )
}
