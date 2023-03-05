// Hoooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'

// Data
import constellations from '~/data/constellations'

// Components
import { BtnHome } from '~/components/btnHome'
import { ToolInfo } from '~/components/toolInfo'
import { ImageViewer } from '~/components/imageViewer'
import { ListOfFiles } from '~/components/listOfFiles'

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
  const [DragAndDrop, images, upgradeImages] = useUploadFiles()

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
        updateImage(cropper)
        const croppedImg = cropper.getCroppedCanvas().toDataURL('image/png')
        document.querySelector('#prueba').src = croppedImg
      }
    })

    setInstanceCropper(cropper)
  }, [currentImage])

  useEffect(() => {

  }, [])

  function updateImage(cropper) {
    const newImage = { ...currentImage }
    newImage.cropData = cropper.getData()

    setCurrentImage(newImage)

    const newImages = images.map(image => {
      if (image.asset_id === newImage.asset_id) {
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
          <div className='previewCrop'>
            <p className='fileInfoName'>
              Preview:
            </p>
            <picture className='previewCropContainer'>
              <img src={currentImage?.secure_url} alt={`Image of ${currentImage?.original_filename}`} id='prueba' className='previewCropImage' />
            </picture>
          </div>
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
      <script
        src='https://cdnjs.cloudflare.com/ajax/libs/cropperjs/2.0.0-alpha/cropper.min.js'
        integrity='sha512-pfbxSnz2K5IoriSDRsDoM6d5VJXz+XqImI/g8VAF7DXZBs0+Uo+/l/mHRFgr9qm76l7nnDy917PehLkodduyzg=='
        crossOrigin='anonymous'
        referrerPolicy='no-referrer'
      />
    </>
  )
}

export default ImageCropper
