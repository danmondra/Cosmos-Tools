import { StellarObjectCircle } from '~/components/stellarObjectCircle'

export function StellarObject({ id, name, tool }) {
  return (
    <article className='stellarObject'>
      <StellarObjectCircle id={id} />
      <div className='infoObject'>
        <h3 className='nameObject'>{name}</h3>
        <p className='nameTool'>{tool}</p>
      </div>
    </article>
  )
}
