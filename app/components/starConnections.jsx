import { useEffect, useState } from 'react'

export function StarConnections() {
  const [positions, setPositions] = useState([])

  const getPositions = () => {
    const starBtns = document.querySelectorAll('.starBtn')

    if (starBtns.length === 0) return

    const positionsCreated = []

    /* Get positions of each button of the list and create object with them */

    starBtns.forEach((_, i) => {
      if (i > 0) {
        const previus = starBtns[i - 1]
        const next = starBtns[i]

        const position = {
          x1: previus.offsetLeft + previus.offsetWidth / 2,
          y1: previus.offsetTop + previus.offsetHeight / 2,
          x2: next.offsetLeft + next.offsetHeight / 2,
          y2: next.offsetTop + next.offsetWidth / 2
        }

        positionsCreated.push(position)
      }
    })

    return positionsCreated
  }

  useEffect(() => {
    setPositions(getPositions())
  }, [])

  return (
    <svg className='svgConnector'>
      {positions?.map(({ x1, y1, x2, y2 }) => (
        <line key={x1 + y1} x1={x1} y1={y1} x2={x2} y2={y2} stroke='gray' />
      ))}

    </svg>
  )
}
