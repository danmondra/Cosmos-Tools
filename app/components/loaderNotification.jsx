import { useOutletContext } from '@remix-run/react'

export function LoaderNotification() {
  const { loader } = useOutletContext()

  return (
    <div className={`loaderContainer ${loader ? 'loaderContainerActive' : ''}`}>
      <div className='lds-dual-ring' />
      <p className='loaderText'>Loading...</p>
    </div>
  )
}
