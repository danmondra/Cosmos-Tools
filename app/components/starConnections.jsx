import { useEffect, useState } from 'react'

export function StarConnections({ id }) {
  const [positions, setPositions] = useState([])
  const [windowSize, setWindowSize] = useState(0)

  const getPositions = () => {
    const starBtns = document.querySelectorAll(`#${id} .starBtn`)

    if (starBtns.length === 0) return

    const positionsCreated = []

    /* Get positions of each star of the map and create object with them */

    starBtns.forEach((starBtn, i) => {
      let previus = starBtns[i - 1]
      let next = starBtns[i]

      if (i === 0) {
        previus = starBtns[starBtns.length - 1]
        next = starBtns[i]
      }

      const position = {
        x1: previus.offsetLeft + previus.offsetWidth / 2,
        y1: previus.offsetTop + previus.offsetHeight / 2,
        x2: next.offsetLeft + next.offsetHeight / 2,
        y2: next.offsetTop + next.offsetWidth / 2,
        id: starBtn.dataset.star
      }

      positionsCreated.push(position)
    })

    return positionsCreated
  }

  function showConnectorLines() {
    const svgConnectorContainers = document.querySelectorAll('.svgConnector')

    setTimeout(() => {
      svgConnectorContainers.forEach(container => {
        container.style.opacity = '1'
      })
    }, 100)
  }

  function resizeListener() {
    window.addEventListener('resize', (e) => {
      setWindowSize(e.target.innerWidth)
    })
  }

  useEffect(() => {
    setPositions(getPositions())
    showConnectorLines()
  }, [windowSize])

  useEffect(() => {
    resizeListener()
  }, [])

  return (
    <svg className='svgConnector'>

      {positions?.map(({ x1, y1, x2, y2, id }) => (
        <line key={id} x1={x1} y1={y1} x2={x2} y2={y2} stroke='gray' />
      ))}

    </svg>
  )
}
