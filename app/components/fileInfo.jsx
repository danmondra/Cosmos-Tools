export function FileInfo({ name, size, dimentions }) {
  return (
    <div className='fileInfo'>
      <p className='fileInfoName'>
        File:
        <span className='fileInfoData'>{name}</span>
      </p>
      <p className='fileInfoName'>
        Size:
        <span className='fileInfoData'>{size}</span>
      </p>
      <p className='fileInfoName'>
        Dimentions:
        <span className='fileInfoData'>{dimentions}</span>
      </p>
    </div>

  )
}
