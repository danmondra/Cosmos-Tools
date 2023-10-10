export function ImageExamples({ fileExamples, setUploadedFiles, group }) {
  function handleClickGroup(e) {
    if (group) {
      setUploadedFiles([...fileExamples], 2500)
    }
  }

  function handleClick(e, file) {
    if (group) return
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
            key={file.assetId}
            className='exampleImageContainer'
            onClick={(e) => {
              handleClick(e, file)
            }}
          >
            <img src={file.urlMinified} alt='Example image to upload to cloudinary' className='exampleImage' />
          </button>
        ))}
      </div>
    </div>
  )
}
