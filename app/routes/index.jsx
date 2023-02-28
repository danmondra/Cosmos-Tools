import { useState } from 'react'

import { StellarObjectsList } from '~/components/stellarObjectsList'
import { Navigation } from '~/components/navigation'
import { Constellations } from '~/components/constellations'

import constellations from '~/data/constellations'

export default function Index() {
  const [constellation, setConstellation] = useState(constellations[0].id)

  return (
    <main className='container main'>
      <div />
      <Navigation
        constellation={constellation}
        setConstellation={setConstellation}
      />
      <StellarObjectsList
        constellation={constellations.find(con => con.id === constellation)}
      />
      <Constellations />
    </main>
  )
}
