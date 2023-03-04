export async function getFileInfo(url) {
  try {
    const res = await fetch(url)
    const data = await res.json()

    // TODO -- Handling error

    return data
  } catch (e) {
    return e
  }
}
