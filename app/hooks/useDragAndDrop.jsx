import { useState } from 'react'

import { uploadFile } from '~/services/uploadFile'

// validExtensions, typefiles as props
export default function useDragAndDrop() {
  const [files, setFiles] = useState([])

  function handleDrop(e) {
    e.preventDefault()

    const files = e.dataTransfer.files
    showFiles(files)
    // if(validExtensions.includes(files.type)) {
    // TODO -- Validar que sean extensiones acorde al archivo esperado
    // }
  }

  function handleChangeFile(e) {
    const files = e.target.files
    showFiles(files)
  }

  async function showFiles(files) {
    let response
    if (files.length === undefined) {
      response = await uploadFile(files)
    } else {
      for (const file of files) {
        response = await uploadFile(file)
      }
    }

    setFiles([...files], response)
  }

  function DragAndDrop() {
    const [dragging, setDragging] = useState(false)

    return (
      <div
        className={`${dragging ? 'dragndropActive' : ''} dragndrop`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => {
          setDragging(false)
        }}
        onDrop={(e) => {
          setDragging(false)
          handleDrop(e)
        }}
      >
        <svg xmlns='http://www.w3.org/2000/svg' height='32' viewBox='0 96 960 960' width='32'><path d='M250 896q-86 0-148-62T40 686q0-78 49.5-137.5T217 477q20-97 94-158.5T482 257q113 0 189.5 81.5T748 534v24q72-2 122 46.5T920 727q0 69-50 119t-119 50H510q-24 0-42-18t-18-42V578l-83 83-43-43 156-156 156 156-43 43-83-83v258h241q45 0 77-32t32-77q0-45-32-77t-77-32h-63v-84q0-89-60.5-153T478 317q-89 0-150 64t-61 153h-19q-62 0-105 43.5T100 685q0 62 43.929 106.5Q187.857 836 250 836h140v60H250Zm230-290Z' fill='#fff' className='cloudIcon' /></svg>
        <p className='dragndropText'>
          Drag image here to upload
        </p>
        <p className='dragndropOr'>or</p>
        <button
          type='submit'
          className='browseFiles'
          onClick={() => document.querySelector('.inputFile').click()}
        >
          Browse files
        </button>
        <input
          className='inputFile'
          type='file'
          name='file'
          onChange={handleChangeFile}
          multiple
        />
      </div>
    )
  }

  return [DragAndDrop, files]
}