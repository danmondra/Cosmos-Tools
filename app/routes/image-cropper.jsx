// Hoooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'

// Data
import constellations from '~/data/constellations'
import { imageExamples } from '~/data/imageExamples'

// Services
import { getFileInfo } from '~/services/getFileInfo'

// Components
import { BtnDownload } from '~/components/btnDownload'
import { BtnHome } from '~/components/btnHome'
import { FileInfo } from '~/components/fileInfo'
import { ImageExamples } from '~/components/imageExamples'
import { ImagePreview } from '~/components/imagePreview'
import { ImageViewer } from '~/components/imageViewer'
import { ListOfFiles } from '~/components/listOfFiles'
import { ToolInfo } from '~/components/toolInfo'

// Libraries
import { Cloudinary } from '@cloudinary/url-gen'
import { crop } from '@cloudinary/url-gen/actions/resize'
import Cropper from 'cropperjs'

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/2.0.0-alpha/cropper.css',
      integrity: 'sha512-zzxY7HWh8LIZ/EPgoos+XIZPsXggrEQ1ZfCMuUl7Lh3e3LzTZfvsG4mut09ZOB9CpDhHE//ORri8ocRR+XwtXQ==',
      crossOrigin: 'anonymous',
      referrerPolicy: 'no-referrer'
    }
  ]
}

export function meta() {
  return (
    {
      title: 'Image Cropper'
    }
  )
}

function ImageCropper() {
  const [DragAndDrop, images, upgradeImages, simuleUpload] = useUploadFiles()

  const [currentImage, setCurrentImage] = useState({})
  const [instanceCropper, setInstanceCropper] = useState({})

  const { name, description } = constellations[0].stars[1]

  useEffect(() => {
    if (images.length === 0) return

    const imageExists = currentImage?.originalFilename
    if (imageExists) return

    setCurrentImage(images[0])
  }, [images])

  useEffect(() => {
    const imageExists = currentImage?.originalFilename
    if (!imageExists) return

    createCropper()
  }, [currentImage])

  function createCropper() {
    const img = document.querySelector('.imageView')

    if (instanceCropper?.bind) {
      instanceCropper.destroy()
    }

    const cropper = new Cropper(img, {
      viewMode: 2,
      cropend() {
        // Show preview
        const croppedImg = cropper.getCroppedCanvas().toDataURL('image/png')
        document.querySelector('#imagePreview').src = croppedImg
      },
      background: false,
      modal: false
    })

    setInstanceCropper(cropper)
  }

  function cropImage() {
    const { x, y, width, height } = instanceCropper.getData(true)

    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const img = cloudinary.image(currentImage.publicId)

    if (currentImage?.lastResize) {
      img.resize(crop().width(width).height(height).x(x + currentImage.lastResize.x).y(y + currentImage.lastResize.y))
    } else {
      img.resize(crop().width(width).height(height).x(x).y(y))
    }

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

    // adapt the coordinates to the new image
    if (currentImage?.lastResize) {
      const { x, y } = instanceCropper.getData(true)
      newImage.lastResize = { x: newImage.lastResize.x + x, y: newImage.lastResize.y + y }
    } else {
      newImage.lastResize = { x: imageInfo.resize[0].x, y: imageInfo.resize[0].y }
    }

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
              <ImagePreview
                image={currentImage}
              />
              <div className='btnsCrop'>
                <button
                  className='btnCropImage'
                  onClick={cropImage}
                >
                  Crop Image
                </button>
                <BtnDownload
                  text='Download'
                  files={currentImage}
                />
              </div>
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
            {currentImage?.originalFilename &&
              <ImageViewer
                file={currentImage}
              />}
          </div>
          {currentImage?.originalFilename
            ? <ListOfFiles
                currentFile={currentImage}
                setCurrentFile={setCurrentImage}
                files={images}
              />
            : <p className='dragndropText'>No images yet</p>}

        </section>

      </main>
    </>
  )
}

export default ImageCropper
