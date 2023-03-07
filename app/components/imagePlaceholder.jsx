export function ImagePlaceholder({ img, alt }) {
  return (
    <div className='imageViewContainer imagePlaceholderContainer'>
      <p className='dragndropText placeholderText'>Your image will be here</p>
      <img src={img} alt={alt} className='imageView imagePlaceholder' />
    </div>

  )
}
