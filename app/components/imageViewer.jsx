export function ImageViewer({ src, alt }) {
  return (
    <picture className='imageViewContainer'>
      <img src={src} alt={alt} className='imageView' />
    </picture>
  )
}
