// Hooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'
import useInputRange from '~/hooks/useInputRange'
import useAspectRatio from '~/hooks/useAspectRatio'

// Data
import constellations from '~/data/constellations'

// Services
import { getFileInfo } from '~/services/getFileInfo'

// Components
import { BtnHome } from '~/components/btnHome'
import { ToolInfo } from '~/components/toolInfo'
import { BtnDownload } from '../components/btnDownload'
import { ListOfFiles } from '~/components/listOfFiles'
import { ImageViewer } from '../components/imageViewer'
import { FileInfo } from '../components/fileInfo'

// Utils
import { formatBytes } from '~/utils/formatBytes'

import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'

export function meta() {
  return (
    {
      title: 'Cosmos Tools - Image resizer'
    }
  )
}

function ImageResizer() {
  const [DragAndDrop, images, setResponses] = useUploadFiles()

  const [currentImage, setCurrentImage] = useState(images.length > 0 ? images[0] : {})

  const [InputRangeWidth, width] = useInputRange({ valueToModify: 'width', currentFile: currentImage })
  const [InputRangeHeight, height] = useInputRange({ valueToModify: 'height', currentFile: currentImage })
  const [BtnAspectRatio, aspectRatio] = useAspectRatio()

  const { name, description } = constellations[0].stars[0]

  useEffect(() => {
    if (images.length === 0) return
    if (currentImage?.original_filename) return

    setCurrentImage(images[0])
  }, [images])

  useEffect(() => {
    if (!currentImage?.original_filename) return

    resizeImage()
  }, [width, height, aspectRatio])

  async function updateImage(img) {
    const newImage = { ...currentImage }

    newImage.width = width || newImage.widthOG
    newImage.height = height || newImage.heightOG
    newImage.secure_url = img.toURL()

    const imageInfo = await getFileInfo(img.addFlag('getinfo').toURL())
    newImage.bytes = imageInfo.output.bytes

    setCurrentImage(newImage)

    const newFiles = images.map(file => file.public_id === newImage.public_id ? newImage : file)
    setResponses(newFiles)
  }

  function resizeImage() {
    if (aspectRatio) {
      // TODO -- Aspect ratio
    }

    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const img = cloudinary.image(currentImage.public_id)
      .resize(scale().width(width).height(height))

    updateImage(img)
  }

  return (
    <main className='container main'>
      <BtnHome />
      <ToolInfo
        name={name}
        description={description}
      />
      <section className='stellarObjectsList fileOptionsContainer'>
        {currentImage?.original_filename &&
          <>
            <form className='formOptionsImage'>
              <InputRangeWidth
                group='resize'
                defaultValue={currentImage.widthOG}
              />
              <InputRangeHeight
                group='resize'
                defaultValue={currentImage.heightOG}
              />

              <BtnAspectRatio />

              <BtnDownload
                text='Download'
                files={currentImage}
              />
            </form>
            <FileInfo
              name={currentImage.original_filename}
              size={formatBytes(currentImage.bytes, 2)}
              dimentions={`${currentImage.width} x ${currentImage.height}px`}
            />
          </>}
      </section>
      <section className='toolContainer'>
        <div className='imageUploadViewContainer'>
          <DragAndDrop />
          {currentImage?.original_filename &&
            <ImageViewer
              src={currentImage.secure_url}
              alt={currentImage.original_filename}
            />}
        </div>

        {currentImage?.original_filename
          ? <ListOfFiles
              currentFile={currentImage}
              setCurrentFile={setCurrentImage}
              files={images}
            />
          : <></>}
      </section>
    </main>
  )
}

export default ImageResizer
