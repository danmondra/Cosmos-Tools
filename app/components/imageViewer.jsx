export function ImageViewer({ file }) {
  const { secure_url, original_filename, asset_id } = file
  function handleLoad() {
    // setLoader false
  }

  return (
    <picture className='imageViewContainer' data-imageid={asset_id}>
      <img src={secure_url} alt={`Image of ${original_filename}`} className='imageView' onLoad={handleLoad} />
    </picture>
  )
}
