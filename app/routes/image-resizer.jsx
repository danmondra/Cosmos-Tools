// Hooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'
import useInputRange from '~/hooks/useInputRange'
import useAspectRatio from '~/hooks/useAspectRatio'

// Data
import constellations from '~/data/constellations'
import { imageExamples } from '~/data/imageExamples'

// Services
import { getFileInfo } from '~/services/getFileInfo'

// Components
import { BtnHome } from '~/components/btnHome'
import { ToolInfo } from '~/components/toolInfo'
import { BtnDownload } from '~/components/btnDownload'
import { ListOfFiles } from '~/components/listOfFiles'
import { ImageViewer } from '~/components/imageViewer'
import { FileInfo } from '~/components/fileInfo'
import { ImageExamples } from '~/components/imageExamples'

import { Cloudinary } from '@cloudinary/url-gen'
import { scale, fit } from '@cloudinary/url-gen/actions/resize'

export function meta() {
  return (
    {
      title: 'Cosmos Tools - Image resizer'
    }
  )
}

function ImageResizer() {
  const [DragAndDrop, images, setUploadedImages] = useUploadFiles()

  const [currentImage, setCurrentImage] = useState({})

  const [InputRangeWidth, width] = useInputRange({ valueToModify: 'width', currentFile: currentImage })
  const [InputRangeHeight, height] = useInputRange({ valueToModify: 'height', currentFile: currentImage })
  const [BtnAspectRatio, aspectRatio] = useAspectRatio({ defaultValue: false })

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

  function resizeImage() {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const img = cloudinary.image(currentImage.public_id)

    if (aspectRatio) {
      img.resize(fit().width(width).height(height))
    } else {
      img.resize(scale().width(width).height(height))
    }

    updateImage(img)
  }

  async function updateImage(img) {
    const newImage = { ...currentImage }

    newImage.width = width
    newImage.height = height
    newImage.secure_url = img.toURL()

    const urlImageInfo = img.addFlag('getinfo').toURL()
    const imageInfo = await getFileInfo(urlImageInfo)
    newImage.bytes = imageInfo?.output?.bytes

    setCurrentImage(newImage)

    const newImages = images.map(file => {
      if (file.public_id === newImage.public_id) {
        return newImage
      }
      return file
    })
    setUploadedImages(newImages)
  }

  return (
    <main className='container main'>
      <BtnHome />
      <ToolInfo
        name={name}
        description={description}
      />
      <section className='stellarObjectsList fileOptionsContainer'>
        {currentImage?.original_filename
          ? <>
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
              file={currentImage}
            />
            </>
          : <>
            <ImageExamples
              fileExamples={imageExamples}
              setUploadedFiles={setUploadedImages}
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
          : <p className='dragndropText'>No images yet</p>}
      </section>
    </main>
  )
}

export default ImageResizer
