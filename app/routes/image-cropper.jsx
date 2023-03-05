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
import { ImageViewer } from '~/components/imageViewer'
import { ListOfFiles } from '~/components/listOfFiles'
import { ImageExamples } from '~/components/imageExamples'
import { FileInfo } from '~/components/fileInfo'

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
    if (currentImage?.original_filename) return

    setCurrentImage(images[0])
  }, [images])

  useEffect(() => {
    if (!currentImage?.original_filename) return

    const img = document.querySelector('.imageView')

    if (instanceCropper?.bind) {
      instanceCropper.destroy()
    }

    const cropper = new Cropper(img, {
      viewMode: 2,
      data: 'cropData' in currentImage ? currentImage.cropData : null,
      cropend() {
        // Show preview
        const croppedImg = cropper.getCroppedCanvas().toDataURL('image/png')
        document.querySelector('#prueba').src = croppedImg
      },
      background: false,
      modal: false
    })

    setInstanceCropper(cropper)
  }, [currentImage])

  async function updateImage(img) {
    const newImage = { ...currentImage }

    if (img) {
      newImage.secure_url = img.toURL()

      const urlImageInfo = img.addFlag('getinfo').toURL()
      const imageInfo = await getFileInfo(urlImageInfo)
      newImage.bytes = imageInfo?.output?.bytes
    }

    setCurrentImage(newImage)

    const newImages = images.map(image => {
      if (image.asset_id === newImage.asset_id) {
        return newImage
      }
      return image
    })

    upgradeImages(newImages)
  }

  function cropImage() {
    const { x, y, width, height } = instanceCropper.getData(true)

    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const img = cloudinary.image(currentImage.public_id).resize(crop().width(width).height(height).x(x).y(y))

    updateImage(img)
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
          {currentImage?.original_filename
            ? <>
              <div className='previewCrop'>
                <p className='fileInfoName'>
                  Preview:
                </p>
                <picture className='previewCropContainer'>
                  <img src={currentImage?.secure_url} alt={`Image of ${currentImage?.original_filename}`} id='prueba' className='previewCropImage' />
                </picture>
              </div>
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
                fileExamples={imageExamples}
                setUploadedFiles={simuleUpload}
              />}
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
    </>
  )
}

export default ImageCropper
