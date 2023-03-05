import { formatBytes, formatDimentions } from '~/utils/formatData'

export function ListFile({ currentFile, setCurrentFile, file }) {
  const { secure_url, original_filename, width, height, bytes, asset_id } = file

  function handleClick() {
    setCurrentFile(file)
  }

  return (
    <button
      className={`listFile ${currentFile?.asset_id === asset_id ? 'listFileActive' : ''}`}
      onClick={handleClick}
    >
      <img src={secure_url} className='listFileImg' />
      <p className='listFileInfo'>
        <span className='listFileName'>{original_filename}</span>
        <span className='listFileSizes'>
          <span>{formatDimentions(width, height)}</span>
          <span>{formatBytes(bytes, 2)}</span>
        </span>
      </p>
    </button>

  )
}
