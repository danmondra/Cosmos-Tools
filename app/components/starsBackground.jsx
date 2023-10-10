export function StarsBackground () {
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
