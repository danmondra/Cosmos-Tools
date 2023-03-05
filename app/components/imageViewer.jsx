export function ImageViewer({ src, alt }) {
  function handleLoad() {
    // setLoader false
  }

  return (
    <picture className='imageViewContainer'>
      <img src={src} alt={alt} className='imageView' onLoad={handleLoad} />
    </picture>
  )
}
