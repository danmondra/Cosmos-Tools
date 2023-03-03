export async function uploadFile(file) {
  const CLOUDINARY_API = process.env.CLOUDINARY_API
  const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  try {
    const res = await fetch(CLOUDINARY_API,
      {
        method: 'Post',
        body: formData
      }
    )
    const data = await res.json()

    return data
  } catch (e) {
    return e
  }
}
