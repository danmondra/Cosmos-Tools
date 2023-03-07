import { ListFile } from './listFile'
import { BtnDownload } from './btnDownload'

export function ListOfFiles({ currentFile, setCurrentFile, files }) {
  return (
    <div className='listOfFilesContainer'>
      <div className='listOfFiles'>
        {files.map(file => (
          <ListFile
            key={file.assetId}
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            file={file}
          />
        ))}
      </div>
      {files.length > 1 &&
        <BtnDownload
          text='Download All'
          files={files}
        />}
    </div>
  )
}
