// Hoooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'

// Data
import constellations from '~/data/constellations'
import { imageExamples } from '~/data/imageExamples'

// Services
import { getFileInfo } from '~/services/getFileInfo'

// Components
import { BtnHome } from '~/components/btnHome'
import { BtnDownload } from '~/components/btnDownload'
import { ToolInfo } from '~/components/toolInfo'
import { ListOfFiles } from '~/components/listOfFiles'
import { ImageExamples } from '~/components/imageExamples'
import { FileInfo } from '~/components/fileInfo'
import { ImageViewer } from '~/components/imageViewer'
import { ImagePlaceholder } from '../components/imagePlaceholder'

// Libraries
import { Cloudinary } from '@cloudinary/url-gen'
import { format } from '@cloudinary/url-gen/actions/delivery'
import { getPage } from '@cloudinary/url-gen/actions/extract'

export function meta() {
  return (
    {
      title: 'PDF to JPG'
    }
  )
}

function PdfToJpg() {
  const [DragAndDrop, files, upgradeFiles, simuleUpload] = useUploadFiles()

  const [currentFile, setCurrentFile] = useState({})

  const { name, description } = constellations[1].stars[2]

  useEffect(() => {
    if (files.length === 0) return

    const fileExists = currentFile?.originalFilename
    if (fileExists) return

    setCurrentFile(files[0])
  }, [files])

  useEffect(() => {
    if (files.length === 0) return

    files.forEach((file) => {
      if (!file.removedBackground) {
        convertToJpg(file)
      }
    })
  }, [files])

  function convertToJpg(file) {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const cloudinaryFile = cloudinary.image(file.publicId)
      .extract(getPage().byNumber(1))
      .delivery(format('jpg'))

    updateImage(file, cloudinaryFile)
  }

  async function updateImage(file, cloudinaryFile) {
    const newFile = { ...file }

    newFile.secureUrl = cloudinaryFile.toURL()

    const urlFileInfo = cloudinaryFile.addFlag('getinfo').toURL()
    const fileInfo = await getFileInfo(urlFileInfo)

    newFile.bytes = fileInfo.output.bytes
    newFile.width = fileInfo.output.width
    newFile.height = fileInfo.output.height
    newFile.removedBackground = true

    setCurrentFile(newFile)

    const newImages = files.map(file => {
      if (file.assetId === newFile.assetId) {
        return newFile
      }
      return file
    })

    upgradeFiles(newImages)
  }

  return (
    <>
      <main className='container main'>
        <BtnHome />
        <ToolInfo
          name={name}
          description={description}
        />

        <section className='stellarObjectsList fileOptionsContainer'>
          {currentFile?.originalFilename
            ? <>
              <BtnDownload
                text='Download'
                files={currentFile}
              />
              <FileInfo
                file={currentFile}
              />
            </>
            : <>
              <h2 className='examplesTitle'>No pdf? Don't worry, download this and try it!:</h2>
              <a
                href='https://eloquentjs-es.thedojo.mx/Eloquent_JavaScript.pdf'
                target='_blank'
                rel='noopener noreferrer'
                className='examplesLink'
              >
                Eloquent JavaScript
              </a>
            </>}
        </section>

        <section className='toolContainer'>
          <div className='imageUploadViewContainer'>
            <DragAndDrop />
            {currentFile?.originalFilename
              ? <ImageViewer
                  file={currentFile}
                />
              : <ImagePlaceholder
                  img='https://res.cloudinary.com/dczm31ujx/image/upload/v1678186884/hackaton/photo-1544942579-9671c890fe89_ixlib_rb-4_rziwcw.png'
                  alt='white lighthouse photo'
                />}
          </div>
          <ListOfFiles
            currentFile={currentFile}
            setCurrentFile={setCurrentFile}
            files={files}
          />
        </section>
      </main>
    </>
  )
}

export default PdfToJpg
