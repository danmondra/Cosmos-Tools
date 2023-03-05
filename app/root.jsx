import { Outlet, Meta, Links, LiveReload, Scripts } from '@remix-run/react'

import { StarsBackground } from '~/components/starsBackground'
import { Header } from '~/components/header'

import normalize from '~/styles/normalize.css'
import stars from '~/styles/stars.css'
import styles from '~/styles/index.css'

export function meta() {
  return (
    {
      charset: 'utf-8',
      title: 'Cosmos Tools',
      viewport: 'width=device-width,initial-scale=1',
      description: 'CosmosTools is a collections of tools to help you manipulate images and videos'
    }
  )
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: normalize
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'true'

    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap'
    },
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'stylesheet',
      href: stars
    }

  ]
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

function Document({ children }) {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <StarsBackground />
        <Header />
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
