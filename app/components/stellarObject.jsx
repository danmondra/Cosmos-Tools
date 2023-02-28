import { Link } from '@remix-run/react'
import { StellarObjectCircle } from '~/components/stellarObjectCircle'

export function StellarObject({ star }) {
  const { name, description, url } = star
  return (
    <Link to={url} className='stellarObject'>
      <StellarObjectCircle star={star} />
      <div className='infoObject'>
        <h3 className='nameObject'>{name}</h3>
        <p className='nameTool'>{description}</p>
      </div>
    </Link>
  )
}
