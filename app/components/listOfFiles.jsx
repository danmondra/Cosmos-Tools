import { ListFile } from './listFile'
import { BtnDownload } from './btnDownload'

export function ListOfFiles({ currentFile, setCurrentFile, files }) {
  return (
    <>
      {
        currentFile.originalFilename
          ? <div className='listOfFilesContainer'>
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
          : <p className='dragndropText'>No images yet</p>
      }
    </>
  )
}
