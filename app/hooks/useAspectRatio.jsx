import { useState } from 'react'

export default function useAspectRatio() {
  const [aspectRatio, setAspectRatio] = useState(false)

  function handleChange() {
    setAspectRatio(!aspectRatio)
  }

  function BtnAspectRatio() {
    return (
      <label htmlFor='aspectRatio' className='aspectRatio'>
        <input
          id='aspectRatio'
          type='checkbox'
          name='resize'
          className='checkBoxAspectRatio'
          checked={aspectRatio}
          onChange={handleChange}
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='32'
          viewBox='0 96 960 960'
          width='32'
          className='checkBoxIcon'
        >
          <path d='M577 782h191V588h-60v134H577v60ZM193 564h60V430h131v-60H193v194Zm-53 332q-24 0-42-18t-18-42V316q0-24 18-42t42-18h680q24 0 42 18t18 42v520q0 24-18 42t-42 18H140Zm0-60h680V316H140v520Zm0 0V316v520Z' fill='#fff' />
        </svg>

      </label>
    )
  }

  return [BtnAspectRatio, aspectRatio]
}
