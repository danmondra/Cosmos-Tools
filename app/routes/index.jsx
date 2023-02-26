import { StellarObjectsList } from '~/components/stellarObjectsList'
import { Navigation } from '~/components/navigation'

export default function Index() {
  return (
    <main className='container main'>
      <StellarObjectsList />
      <section className='constellation'>
        <Navigation />
      </section>
    </main>
  )
}
