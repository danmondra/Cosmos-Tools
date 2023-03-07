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

    toDownload.forEach(async ({ secureUrl, originalFilename }) => {
      const fileUrl = await getFileBlobUrl(secureUrl)

      const downloadLink = document.createElement('a')
      downloadLink.href = fileUrl
      downloadLink.download = originalFilename

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
    >
      {text}
      <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 96 960 960' width='24' fill='#fff'><path d='M220 896q-24 0-42-18t-18-42V693h60v143h520V693h60v143q0 24-18 42t-42 18H220Zm260-153L287 550l43-43 120 120V256h60v371l120-120 43 43-193 193Z' /></svg>
    </button>
  )
}
