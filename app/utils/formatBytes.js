export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const sizeByte = 1024
  const dm = decimals > 0 ? decimals : 0

  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const index = Math.floor(Math.log(bytes) / Math.log(sizeByte))

  return `${parseFloat((bytes / Math.pow(sizeByte, index)).toFixed(dm))} ${sizes[index]}`
}
