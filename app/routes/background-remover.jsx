// Hoooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'
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
import { ImagesComparator } from '../components/imageComparator'
import { ImagePlaceholder } from '../components/imagePlaceholder'

// Libraries
import { Cloudinary } from '@cloudinary/url-gen'
import { removeBackground, makeTransparent } from '@cloudinary/url-gen/actions/effect'
import { format } from '@cloudinary/url-gen/actions/delivery'

export function meta() {
  return (
    {
      title: 'Background Remover'
    }
  )
}

function BackgroundRemover() {
  const { toggleLoader } = useOutletContext()
  const [DragAndDrop, images, upgradeImages, simuleUpload] = useUploadFiles()

  const [currentImage, setCurrentImage] = useState({})

  const { name, description } = constellations[1].stars[0]

  useEffect(() => {
    if (images.length === 0) return

    const imageExists = currentImage?.originalFilename
    if (imageExists) return

    setCurrentImage(images[0])
  }, [images])

  useEffect(() => {
    if (images.length === 0) return

    images.forEach((image) => {
      if (!image.removedBackground) {
        toggleLoader(true)
        removeBg(image)
      }
    })
  }, [images])

  function removeBg(image) {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const cloudinaryImg = cloudinary.image(image.publicId)
      .effect(makeTransparent())
      .effect(removeBackground())
      .delivery(format('png'))

    updateImage(image, cloudinaryImg)
  }

  async function updateImage(image, cloudinaryImg) {
    const newImage = { ...image }

    newImage.secureUrl = cloudinaryImg.toURL()

    const urlImageInfo = cloudinaryImg.addFlag('getinfo').toURL()
    const imageInfo = await getFileInfo(urlImageInfo)

    newImage.bytes = imageInfo.output.bytes
    newImage.width = imageInfo.output.width
    newImage.height = imageInfo.output.height
    newImage.removedBackground = true

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
              <BtnDownload
                text='Download'
                files={currentImage}
              />
              <FileInfo
                file={currentImage}
              />
              <p className='fileInfoWarning'>
                <svg xmlns='http://www.w3.org/2000/svg' height='48' viewBox='0 96 960 960' width='48' fill='#fff' className='fileInfoWarningIcon'><path d='M479.982 776q14.018 0 23.518-9.482 9.5-9.483 9.5-23.5 0-14.018-9.482-23.518-9.483-9.5-23.5-9.5-14.018 0-23.518 9.482-9.5 9.483-9.5 23.5 0 14.018 9.482 23.518 9.483 9.5 23.5 9.5ZM453 623h60V370h-60v253Zm27.266 353q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80 658.319 80 575.5q0-82.819 31.5-155.659Q143 347 197.5 293t127.341-85.5Q397.681 176 480.5 176q82.819 0 155.659 31.5Q709 239 763 293t85.5 127Q880 493 880 575.734q0 82.734-31.5 155.5T763 858.316q-54 54.316-127 86Q563 976 480.266 976Zm.234-60Q622 916 721 816.5t99-241Q820 434 721.188 335 622.375 236 480 236q-141 0-240.5 98.812Q140 433.625 140 576q0 141 99.5 240.5t241 99.5Zm-.5-340Z' /></svg>
                This is a free version so it may have bugs, we recommend using only images with solid backgrounds.
              </p>
              </>
            : <ImageExamples
                fileExamples={imageExamples.bgRemoval}
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
                  img='https://res.cloudinary.com/dczm31ujx/image/upload/v1678184402/hackaton/photo-1447433865958-f402f562b843_ixlib_rb-4_2_xpfvra.png'
                  alt='astronaut fixing something'
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

export default BackgroundRemover
