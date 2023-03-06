import { useState } from 'react'

import { formatBytes } from '~/utils/formatData'

export default function useInputCompress({ valueToModify }) {
  const [percentCompressed, setPercentCompressed] = useState(100)

  function handleMouseUp(e) {
    setPercentCompressed(+e.target.value)
  }

  function InputRange({ group, size, sizeOG }) {
    function handleChange(e) {
      const percentCompressed = document.querySelector('.percentCompressed')
      percentCompressed.textContent = `${e.target.value}%`
    }

    return (
      <div className={`inputContainer ${valueToModify}`}>
        <label htmlFor={valueToModify} className='inputName'>
          {valueToModify}:
          <span className='scaleNumber percentCompressed'>{percentCompressed}%</span>
        </label>
        <input
          id={valueToModify}
          type='range'
          name={group}
          max='100'
          min='1'
          defaultValue={percentCompressed}
          onMouseUp={handleMouseUp}
          onChange={handleChange}
        />
        <p className='rangeSize sizeCompressed'>-{formatBytes(sizeOG - size, 2)}</p>
      </div>
    )
  }

  return [InputRange, percentCompressed]
}
