export function BtnDownload({ text, files }) {
  async function getFileBlobUrl(url) {
    const file = await fetch(url)
    const fileBlob = await file.blob()
    const fileUrl = URL.createObjectURL(fileBlob)

    return fileUrl
  }

  async function handleDownload(e) {
    e.preventDefault()

    let toDownload = [files]

    if (files.length > 0) {
      toDownload = [...files]
    }

    toDownload.forEach(async ({ secure_url, original_filename }) => {
      const fileUrl = await getFileBlobUrl(secure_url)

      const downloadLink = document.createElement('a')
      downloadLink.href = fileUrl
      downloadLink.download = original_filename

      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)

      URL.revokeObjectURL(fileUrl)
    })
  }

  return (
    <button
      className='btnDownload'
      onClick={handleDownload}
    >{text}
    </button>
  )
}
