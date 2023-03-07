export function ImageViewer({ file, toggleLoader }) {
  const { secureUrl, originalFilename, assetId } = file

  function handleLoad() {
    toggleLoader(false)
  }

  return (
    <picture className='imageViewContainer' data-imageid={assetId}>
      <img src={secureUrl} alt={`Image of ${originalFilename}`} className='imageView' onLoad={handleLoad} />
    </picture>
  )
}
