// Hooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'
import useInputSize from '~/hooks/useInputSize'

// Data
import constellations from '~/data/constellations'
import { imageExamples } from '~/data/imageExamples'

// Services
import { getFileInfo } from '~/services/getFileInfo'

// Components
import { BtnHome } from '~/components/btnHome'
import { ToolInfo } from '~/components/toolInfo'
import { BtnDownload } from '~/components/btnDownload'
import { BtnsScale } from '~/components/btnsScale'
import { ListOfFiles } from '~/components/listOfFiles'
import { ImageViewer } from '~/components/imageViewer'
import { FileInfo } from '~/components/fileInfo'
import { ImageExamples } from '~/components/imageExamples'

// Cloudinary
import { Cloudinary } from '@cloudinary/url-gen'
import { scale as cloudinaryScale, fit } from '@cloudinary/url-gen/actions/resize'

export function meta() {
  return (
    {
      title: 'Cosmos Tools - Image resizer'
    }
  )
}

function ImageResizer() {
  const [DragAndDrop, images, upgradeImages, simuleUpload] = useUploadFiles()

  const [currentImage, setCurrentImage] = useState({})

  const [InputRangeWidth, width] = useInputSize({ valueToModify: 'width', currentFile: currentImage })
  const [InputRangeHeight, height] = useInputSize({ valueToModify: 'height', currentFile: currentImage })

  const { name, description } = constellations[0].stars[0]

  useEffect(() => {
    if (images.length === 0) return

    const imageExists = currentImage?.original_filename
    if (imageExists) return

    setCurrentImage(images[0])
  }, [images])

  useEffect(() => {
    const imageExists = currentImage?.original_filename
    if (!imageExists) return

    resizeImage()
  }, [width, height])

  function resizeImage(scale) {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const img = cloudinary.image(currentImage.public_id)

    if (scale) {
      const { widthOG, heightOG } = currentImage
      img.resize(fit().width(Math.floor(widthOG * scale)).height(Math.floor(heightOG * scale)))
    } else {
      img.resize(cloudinaryScale().width(width).height(height))
    }

    updateImage(img)
  }

  async function updateImage(img) {
    const newImage = { ...currentImage }

    newImage.secure_url = img.toURL()

    const urlImageInfo = img.addFlag('getinfo').toURL()
    const imageInfo = await getFileInfo(urlImageInfo)

    newImage.bytes = imageInfo.output.bytes
    newImage.width = imageInfo.output.width
    newImage.height = imageInfo.output.height

    setCurrentImage(newImage)

    const newImages = images.map(file => {
      if (file.public_id === newImage.public_id) {
        return newImage
      }
      return file
    })
    upgradeImages(newImages)
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

              <BtnsScale
                proportions={[0.1, 0.5, 1, 2]}
                resizeImage={resizeImage}
              />

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
              setUploadedFiles={simuleUpload}
            />
            </>}
      </section>
      <section className='toolContainer'>
        <div className='imageUploadViewContainer'>
          <DragAndDrop />
          {currentImage?.original_filename &&
            <ImageViewer
              file={currentImage}
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
