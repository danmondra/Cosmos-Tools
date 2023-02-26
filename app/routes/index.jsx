import { StellarObjectsList } from '~/components/stellarObjectsList'

export default function Index() {
  return (
    <main className='container main'>
      <StellarObjectsList />
      <section className='constellation'>
        <nav className='navigation'>
          <a href='#images' className='navigationLinks'>
            Images
          </a>
          <a href='#creators' className='navigationLinks'>
            Creators
          </a>
          <a href='#videos' className='navigationLinks'>
            Videos
          </a>
        </nav>
      </section>
    </main>
  )
}
