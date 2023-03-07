export function ImagePlaceholder({ img, alt }) {
  return (
    <div className='imageViewContainer imagePlaceholderContainer'>
      <p className='dragndropText placeholderText'>Your images here, when you have</p>
      <img src={img} alt={alt} className='imageView imagePlaceholder' />
    </div>

  )
}
