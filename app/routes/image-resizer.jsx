// Hooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'
import useInputRange from '~/hooks/useInputRange'
import useAspectRatio from '~/hooks/useAspectRatio'

// Data
import constellations from '~/data/constellations'
import { Cloudinary } from '@cloudinary/url-gen'

import { scale } from '@cloudinary/url-gen/actions/resize'

// Components
import { BtnHome } from '~/components/btnHome'
import { ToolInfo } from '~/components/toolInfo'
import { BtnDownload } from '../components/btnDownload'
import { ListOfFiles } from '~/components/listOfFiles'
import { ImageViewer } from '../components/imageViewer'
import { FileInfo } from '../components/fileInfo'

export function meta() {
  return (
    {
      title: 'Cosmos Tools - Image resizer'
    }
  )
}

function ImageResizer() {
  const [DragAndDrop, files, setResponses] = useUploadFiles()

  const [actualFile, setActualFile] = useState(files.length > 0 ? files[0] : {})

  const [InputRangeWidth, width] = useInputRange()
  const [InputRangeHeight, height] = useInputRange()
  const [BtnAspectRatio, aspectRatio] = useAspectRatio()

  const { name, description } = constellations[0].stars[0]

  function resizeImage() {
    if (aspectRatio) {
      // TODO -- Aspect ratio
    }

    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const img = cloudinary.image(actualFile.public_id)
      .resize(scale().width(width || actualFile.widthOG).height(height || actualFile.heightOG))

    const newImage = actualFile
    newImage.secure_url = img.toURL()
    newImage.width = width || newImage.widthOG
    newImage.height = height || newImage.heightOG

    setActualFile({ ...newImage })

    const newFiles = files.map(file => file.public_id === newImage.public_id ? newImage : file)
    setResponses(newFiles)
  }

  useEffect(() => {
    if (files.length === 0) return
    if (actualFile?.original_filename) return

    setActualFile(files[0])
  }, [files])

  useEffect(() => {
    if (!actualFile?.original_filename) return

    resizeImage()
  }, [width, height, aspectRatio])

  return (
    <main className='container main'>
      <BtnHome />
      <ToolInfo
        name={name}
        description={description}
      />
      <section className='stellarObjectsList fileOptionsContainer'>
        {actualFile?.original_filename &&
          <>
            <form className='formOptionsImage'>
              <InputRangeWidth
                valueToModify='Width'
                group='resize'
                defaultValue={actualFile.widthOG}
              />
              <InputRangeHeight
                valueToModify='Height'
                group='resize'
                defaultValue={actualFile.heightOG}
              />

              <BtnAspectRatio />

              <BtnDownload
                text='Download'
              />
            </form>
            <FileInfo
              name={actualFile.original_filename}
              size={`${Math.round(actualFile.bytes / 1024)}kB`}
              dimentions={`${actualFile.width} x ${actualFile.height}px`}
            />
          </>}
      </section>
      <section className='toolContainer'>
        <div className='imageUploadViewContainer'>
          <DragAndDrop />
          {actualFile?.original_filename &&
            <ImageViewer
              src={actualFile.secure_url}
              alt={actualFile.original_filename}
            />}
        </div>

        {actualFile?.original_filename
          ? <ListOfFiles
              actualFile={actualFile}
              setActualFile={setActualFile}
              files={files}
            />
          : <></>}
      </section>
    </main>
  )
}

export default ImageResizer
