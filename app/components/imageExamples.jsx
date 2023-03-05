export function ImageExamples({ fileExamples, setUploadedFiles }) {
  function handleClick(file) {
    setUploadedFiles([file])
  }

  return (
    <div className='imagesExamples'>
      <h2 className='examplesTitle'>
        No images? try clicking on these:
      </h2>
      <div className='examplesList'>
        {fileExamples.map(file => (
          <button
            key={file.asset_id}
            className='exampleImageContainer'
            onClick={() => {
              handleClick(file)
            }}
          >
            <img src={file.url_minified} alt='Example image to upload to cloudinary' className='exampleImage' />
          </button>
        ))}
      </div>
    </div>
  )
}
