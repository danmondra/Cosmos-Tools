import { useState } from 'react'

import { PlaceholderDragAndDrop } from '~/components/placeholderDragAndDrop'
import { Uploading } from '~/components/uploading'

import { uploadFile } from '~/services/uploadFile'

export default function useUploadFiles() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  function upgradeFiles(files) {
    setUploadedFiles([...files])
  }

  function simuleUpload(files) {
    setUploading(true)
    setTimeout(() => {
      setUploadedFiles([...files])
      setUploading(false)
    }, 1500)
  }

  function handleChangeFile(e) {
    setUploading(true)
    const files = e.target.files
    uploadFiles(files)
  }

  function formatResponse(file) {
    const formatedResponse = {
      asset_id: file.asset_id,
      bytes: file.bytes,
      bytesOG: file.bytes,
      format: file.format,
      height: file.height,
      heightOG: file.height,
      original_filename: file.original_filename,
      public_id: file.public_id,
      secure_url: file.secure_url,
      width: file.width,
      widthOG: file.width
    }

    return formatedResponse
  }

  async function uploadFiles(files) {
    const fileResponses = []

    for (const file of files) {
      const fileUploaded = await uploadFile(file)

      const formatedResponse = formatResponse(fileUploaded)

      fileResponses.push(formatedResponse)
    }

    setUploadedFiles([...uploadedFiles, ...fileResponses])
    setUploading(false)
  }

  function DragAndDrop() {
    const [dragging, setDragging] = useState(false)

    function handleDragOver(e) {
      e.preventDefault()
      setDragging(true)
    }

    function handleDragLeave() {
      setDragging(false)
    }

    function handleDrop(e) {
      e.preventDefault()
      setUploading(true)
      setDragging(false)

      // TODO -- Validar que sean extensiones acorde al archivo esperado

      const files = e.dataTransfer.files

      uploadFiles(files)
    }

    return (
      <div
        className={`${dragging ? 'dragndropActive' : ''} dragndrop`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {uploading
          ? <Uploading />
          : <>
            <PlaceholderDragAndDrop />
            <input
              className='inputFile'
              type='file'
              name='file'
              onChange={handleChangeFile}
              multiple
            />
            </>}
      </div>
    )
  }

  return [DragAndDrop, uploadedFiles, upgradeFiles, simuleUpload]
}
