import { useState } from 'react'

import { StellarObjectsList } from '~/components/stellarObjectsList'
import { Navigation } from '~/components/navigation'

export default function Index() {
  const [constellation, setConstellation] = useState('images')
  return (
    <main className='container main'>
      <div />
      <Navigation
        constellation={constellation}
        setConstellation={setConstellation}
      />
      <StellarObjectsList />
      <section className='constellations'>
        <div className='constellationsGrid'>
          <section className='constellation' id='images'>Images</section>
          <section className='constellation' id='creators'>Creators</section>
          <section className='constellation' id='videos'>Videos</section>
        </div>
      </section>
    </main>
  )
}
