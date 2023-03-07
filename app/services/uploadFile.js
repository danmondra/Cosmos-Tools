export async function uploadFile(file) {
  const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/dczm31ujx/image/upload'
  const CLOUDINARY_UPLOAD_PRESET = 'miduHackaton'

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
