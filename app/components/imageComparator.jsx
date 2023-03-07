import { useState, useEffect } from 'react'

export function ImagesComparator({ currentImage, zoomOn }) {
  const [zoom, setZoom] = useState(zoomOn)

  useEffect(() => {
    import('two-up-element')
  }, [])

  function handleClick() {
    setZoom(!zoom)
  }

  return (
    <div className='compareImages'>
      <div className='compareImagesTypeView'>
        {zoom
          ? <button
              className='compareImagesViewBtn'
              onClick={handleClick}
            >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='20'
              viewBox='0 96 960 960'
              width='20'
              fill='#fff'
            >
              <path
                d='m122 976-42-42 298-298H180v-60h300v300h-60V678L122 976Zm358-400V276h60v198l298-298 42 42-298 298h198v60H480Z'
              />
            </svg>
          </button>
          : <button
              class='compareImagesViewBtn'
              onClick={handleClick}
            >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='20'
              viewBox='0 96 960 960'
              width='20'
              fill='#fff'
            >
              <path d='M120 936V636h60v198l558-558H540v-60h300v300h-60V318L222 876h198v60H120Z' />
            </svg>
            </button>}
      </div>
      <two-up className='two-up imageViewContainer'>
        <img
          src={currentImage.secureUrlOG}
          alt={`Name Image: ${currentImage.originalFilename}`}
          className={`imageView imageViewTwoUp ${zoom ? 'zoom' : ''}`}
        />
        <img
          src={currentImage.secureUrl}
          alt={`Name Image: ${currentImage.originalFilename}`}
          className={`imageView imageViewTwoUp ${zoom ? 'zoom' : ''}`}
        />
      </two-up>
    </div>

  )
}
