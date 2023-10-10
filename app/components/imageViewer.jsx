import { useOutletContext } from '@remix-run/react'
import { useEffect } from 'react'

export function ImageViewer({ file }) {
  const { setLoaderImage } = useOutletContext()
  const { secureUrl, originalFilename, assetId } = file

  useEffect(() => {
    setLoaderImage(false)
  }, [file])

  function handleLoad() {
    setLoaderImage(false)
  }

  return (
    <picture className='imageViewContainer' data-imageid={assetId}>
      <img src={secureUrl} alt={`Image of ${originalFilename}`} className='imageView' onLoad={handleLoad} />
    </picture>
  )
}
