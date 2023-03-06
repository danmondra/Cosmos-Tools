export function ImageExamples({ fileExamples, setUploadedFiles, group }) {
  function handleClickGroup(e) {
    if (group) {
      e.preventDefault()
      e.stopPropagation()
      setUploadedFiles([...fileExamples], 2500)
    }
  }
  function handleClick(file) {
    setUploadedFiles([file], 1500)
  }

  return (
    <div
      className='imagesExamples'
    >
      <h2 className='examplesTitle'>
        No images? try clicking on these:
      </h2>
      <div
        className={`examplesList ${group ? 'examplesListGroup' : ''}`}
        onClick={handleClickGroup}
      >
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
