export function ImagePreview({ image }) {
  const { secure_url, original_filename } = image

  return (
    <div className='previewCrop'>
      <p className='fileInfoName'>
        Preview:
      </p>
      <picture className='previewCropContainer'>
        <img src={secure_url} alt={`Image of ${original_filename}`} id='imagePreview' className='previewCropImage' />
      </picture>
    </div>

  )
}
