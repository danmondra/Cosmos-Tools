import { ListFile } from './listFile'

export function ListOfFiles({ actualFile, setActualFile, files }) {
  return (
    <ul className='listOfFiles'>
      {files.map(file => (
        <ListFile
          key={file.asset_id}
          actualFile={actualFile}
          setActualFile={setActualFile}
          file={file}
        />
      ))}
    </ul>

  )
}
