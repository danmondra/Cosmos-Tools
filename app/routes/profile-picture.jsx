// Hoooks
import { useState, useEffect } from 'react'
import useUploadFiles from '~/hooks/useUploadFiles'

// Data
import constellations from '~/data/constellations'
import { profilePictureExamples } from '~/data/profilePictureExamples'

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

// Libraries
import { Cloudinary } from '@cloudinary/url-gen'
import { max } from '@cloudinary/url-gen/actions/roundCorners'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { format } from '@cloudinary/url-gen/actions/delivery'

export function meta() {
  return (
    {
      title: 'Profile Picture Creator'
    }
  )
}

function ProfilePicture() {
  const [DragAndDrop, images, upgradeImages, simuleUpload] = useUploadFiles()

  const [currentImage, setCurrentImage] = useState({})

  const { name, description } = constellations[1].stars[0]

  useEffect(() => {
    if (images.length === 0) return

    const imageExists = currentImage?.original_filename
    if (imageExists) return

    setCurrentImage(images[0])
  }, [images])

  useEffect(() => {
    if (images.length === 0) return

    images.forEach((image) => {
      if (!image.profile_picture) {
        createProfilePicture(image)
      }
    })
  }, [images])

  function createProfilePicture(image) {
    const cloudinary = new Cloudinary({
      cloud: {
        cloudName: 'dczm31ujx'
      }
    })

    const cloudinaryImg = cloudinary.image(image.public_id).resize(
      fill()
        .width(256)
        .height(256)
        .gravity(autoGravity())
    ).roundCorners(max()).delivery(format('png'))

    updateImage(image, cloudinaryImg)
  }

  async function updateImage(img, cloudinaryImg) {
    const newImage = { ...img }

    newImage.profile_picture = cloudinaryImg.toURL()
    newImage.secure_url = cloudinaryImg.toURL()

    const urlImageInfo = cloudinaryImg.addFlag('getinfo').toURL()
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
              <BtnDownload
                text='Download'
                files={currentImage}
              />
              <FileInfo
                file={currentImage}
              />
              </>
            : <ImageExamples
                fileExamples={profilePictureExamples}
                setUploadedFiles={simuleUpload}
                group
              />}
        </section>

        <section className='toolContainer'>
          <div className='imageUploadViewContainer'>
            <DragAndDrop />
            {currentImage?.original_filename && (
              <ImageViewer
                file={currentImage}
              />
            )}
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

export default ProfilePicture
