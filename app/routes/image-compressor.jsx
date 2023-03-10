// Hoooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'
import useInputCompress from '~/hooks/useInputCompress'
import { useOutletContext } from '@remix-run/react'

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
import { ImagesComparator } from '~/components/imageComparator'
import { ImagePlaceholder } from '~/components/imagePlaceholder'

// Libraries
import { Cloudinary } from '@cloudinary/url-gen'

export function meta() {
  return (
    {
      title: 'Image Compressor'
    }
  )
}

function ImageCompressor() {
  const { toggleLoader } = useOutletContext()

  const [DragAndDrop, images, upgradeImages, simuleUpload] = useUploadFiles()

  const [currentImage, setCurrentImage] = useState({})
  const [InputRangeCompress, percent] = useInputCompress({ valueToModify: 'bytes' })

  const { name, description } = constellations[0].stars[2]

  useEffect(() => {
    if (images.length === 0) return

    const imageExists = currentImage?.originalFilename
    if (imageExists) return

    setCurrentImage(images[0])
  }, [images])

  useEffect(() => {
    const imageExists = currentImage?.originalFilename
    if (!imageExists) return

    toggleLoader(true)
    compressImage()
  }, [percent])

  function compressImage() {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const img = cloudinary.image(currentImage.publicId).quality(percent)

    updateImage(img)
  }

  async function updateImage(img) {
    const newImage = { ...currentImage }

    newImage.secureUrl = img.toURL()

    const urlImageInfo = img.addFlag('getinfo').toURL()
    const imageInfo = await getFileInfo(urlImageInfo)
    newImage.bytes = imageInfo.output.bytes
    newImage.width = imageInfo.output.width
    newImage.height = imageInfo.output.height

    setCurrentImage(newImage)

    const newImages = images.map(image => {
      if (image.assetId === newImage.assetId) {
        return newImage
      }
      return image
    })

    upgradeImages(newImages)
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
          {currentImage?.originalFilename
            ? <>
              <InputRangeCompress
                group='compress'
                size={currentImage.bytes}
                sizeOG={currentImage.bytesOG}
              />
              <BtnDownload
                text='Download'
                files={currentImage}
              />
              <FileInfo
                file={currentImage}
              />
            </>
            : <ImageExamples
                fileExamples={imageExamples.normal}
                setUploadedFiles={simuleUpload}
                group
              />}
        </section>

        <section className='toolContainer'>
          <div className='imageUploadViewContainer'>
            <DragAndDrop />
            {currentImage?.originalFilename
              ? <ImagesComparator
                  currentImage={currentImage}
                  zoomOn={false}
                  toggleLoader={toggleLoader}
                />
              : <ImagePlaceholder
                  img='https://res.cloudinary.com/dczm31ujx/image/upload/v1678186231/hackaton/photo-1446776877081-d282a0f896e2_ixlib_rb-4_2_bipspy.png'
                  alt='photo taken from the space shuttle outside of the earth'
                />}
          </div>
          <ListOfFiles
            currentFile={currentImage}
            setCurrentFile={setCurrentImage}
            files={images}
          />
        </section>
      </main>
    </>
  )
}

export default ImageCompressor
