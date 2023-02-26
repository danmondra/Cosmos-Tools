import { Link } from '@remix-run/react'
import CosmosLogo from '../../public/cosmosLogo.png'

export function Header() {
  return (
    <header>
      <Link to='/'>
        <img src={CosmosLogo} alt='Logo for Cosmos app' />
      </Link>
    </header>
  )
}
