export function ImageViewer({ file }) {
  const { secureUrl, originalFilename, assetId } = file

  function handleLoad() {
    // setLoader false
  }

  return (
    <picture className='imageViewContainer' data-imageid={assetId}>
      <img src={secureUrl} alt={`Image of ${originalFilename}`} className='imageView' onLoad={handleLoad} />
    </picture>
  )
}
