import { formatBytes } from '~/utils/formatBytes'

export function ListFile({ actualFile, setActualFile, file }) {
  const { secure_url, original_filename, width, height, bytes, asset_id } = file

  function handleClick() {
    setActualFile(file)
  }

  return (
    <li
      className={`listFile ${actualFile.asset_id === asset_id ? 'listFileActive' : ''}`}
      onClick={handleClick}
    >
      <img src={secure_url} className='listFileImg' />
      <div className='listFileInfo'>
        <p className='listFileName'>{original_filename}</p>
        <p className='listFileSizes'>
          <span>{`${width} x ${height}px`}</span>
          <span>{formatBytes(bytes, 2)}</span>
        </p>
      </div>
    </li>

  )
}
