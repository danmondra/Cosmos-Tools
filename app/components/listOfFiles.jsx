import { ListFile } from './listFile'
import { BtnDownload } from './btnDownload'

export function ListOfFiles({ currentFile, setCurrentFile, files }) {
  return (
    <div className='listOfFilesContainer'>
      <ul className='listOfFiles'>
        {files.map(file => (
          <ListFile
            key={file.asset_id}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            file={file}
          />
        ))}
      </ul>
      {files.length > 1 &&
        <BtnDownload
          text='Download All'
          files={files}
        />}
    </div>
  )
}
