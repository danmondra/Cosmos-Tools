import { formatBytes, formatDimentions } from '~/utils/formatData'

export function FileInfo({ file }) {
  const { originalFilename, bytes, width, height } = file

  return (
    <div className='fileInfo'>
      <p className='fileInfoName'>
        File:
        <span className='fileInfoData'>{originalFilename}</span>
      </p>
      <p className='fileInfoName'>
        Size:
        <span className='fileInfoData'>{formatBytes(bytes, 2)}</span>
      </p>
      <p className='fileInfoName'>
        Dimentions:
        <span className='fileInfoData'>{formatDimentions(width, height)}</span>
      </p>
    </div>

  )
}
