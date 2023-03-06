import { useEffect } from 'react'

export function StarsBackground () {
  useEffect(() => {
    const z1 = document.getElementsByClassName('z-1')[0]
    const z2 = document.getElementsByClassName('z-2')[0]
    const z3 = document.getElementsByClassName('z-3')[0]
    const ratio = 0.05
    let x
    let y
    document.addEventListener('mousemove', function (e) {
      x = e.pageX
      y = e.pageY
    })
    requestAnimationFrame(function animation () {
      z1.style.transform = 'translate(' + x * ratio + 'px,' + y * ratio + 'px)'
      z2.style.transform =
    'translate(' +
    (x * ratio) / 2 +
    'px,' +
    (y * ratio) / 2 +
    'px) rotate(217deg)'
      z3.style.transform =
    'translate(' +
    (x * ratio) / 3 +
    'px,' +
    (y * ratio) / 3 +
    'px) rotate(71deg)'
      requestAnimationFrame(animation)
    })
  })

  return (
    <div className='bg'>
      <div className='z-3'>
        <div className='tile top-left animate-opacity freq-5' />
        <div className='tile top-right animate-opacity freq-9' />
        <div className='tile bottom-left animate-opacity freq-7' />
        <div className='tile bottom-right animate-opacity freq-10' />
      </div>
      <div className='z-2'>
        <div className='tile top-left animate-opacity freq-9 delay-2' />
        <div className='tile top-right animate-opacity freq-5 delay-2' />
        <div className='tile bottom-left animate-opacity freq-6 delay-4' />
        <div className='tile bottom-right animate-opacity freq-10 delay-4' />
      </div>
      <div className='z-1'>
        <div className='tile top-left animate-opacity freq-7 delay-2' />
        <div className='tile top-right animate-opacity freq-5 delay-4' />
        <div className='tile bottom-left animate-opacity freq-9 delay-2' />
        <div className='tile bottom-right animate-opacity freq-5 delay' />
      </div>
    </div>

  )
}
