export function ImagePreview({ image }) {
  const { secureUrl, originalFilename } = image

  return (
    <div className='previewCrop'>
      <p className='fileInfoName'>
        Preview:
      </p>
      <picture className='previewCropContainer'>
        <img src={secureUrl} alt={`Image of ${originalFilename}`} id='imagePreview' className='previewCropImage' />
      </picture>
    </div>

  )
}
