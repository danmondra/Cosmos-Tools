import { formatBytes, formatDimentions } from '~/utils/formatData'

export function ListFile({ currentFile, setCurrentFile, file }) {
  const { secureUrl, originalFilename, width, height, bytes, assetId } = file

  function handleClick() {
    setCurrentFile(file)
    console.log(file)
  }

  return (
    <button
      className={`listFile ${currentFile?.assetId === assetId ? 'listFileActive' : ''}`}
      onClick={handleClick}
    >
      <img src={secureUrl} className='listFileImg' />
      <p className='listFileInfo'>
        <span className='listFileName'>{originalFilename}</span>
        <span className='listFileSizes'>
          <span>{formatDimentions(width, height)}</span>
          <span>{formatBytes(bytes, 2)}</span>
        </span>
      </p>
    </button>

  )
}
