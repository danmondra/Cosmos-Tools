import { useOutletContext } from '@remix-run/react'

export function LoaderNotification() {
  const { loaderImage, loaderInfo } = useOutletContext()

  console.log({ loaderImage, loaderInfo })

  return (
    <div className={`loaderContainer ${loaderImage || loaderInfo ? 'loaderContainerActive' : ''}`}>
      <div className='lds-dual-ring' />
      <p className='loaderText'>Loading...</p>
    </div>
  )
}
