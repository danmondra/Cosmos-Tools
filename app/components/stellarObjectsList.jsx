import { StellarObject } from '~/components/stellarObject'

export function StellarObjectsList() {
  return (
    <section className='stellarObjectsList'>
      <StellarObject
        id='sirius'
        name='Sirius'
        tool='Image Resizer'
      />
      <StellarObject
        id='vycanismajoris'
        name='VY Canis Majoris'
        tool='Image cropper'
      />
      <StellarObject
        id='adhara'
        name='Adhara'
        tool='Image Scaler'
      />
    </section>

  )
}
