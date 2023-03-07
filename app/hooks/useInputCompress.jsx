import { useState } from 'react'

import { formatBytes } from '~/utils/formatData'

export default function useInputCompress({ valueToModify }) {
  const [percent, setPercent] = useState(100)

  function handleMouseUp(e) {
    setPercent(+e.target.value)
  }

  const textByValue = {
    bytes: 'Compress',
    tolerance: 'Tolerance'
  }

  function InputRange({ group, size, sizeOG }) {
    function handleChange(e) {
      if (!size) return

      const percent = document.querySelector('.percent')
      percent.textContent = `${e.target.value}%`
    }

    return (
      <div className={`inputContainer ${valueToModify}`}>
        <label htmlFor={valueToModify} className='inputName'>
          {textByValue[valueToModify]}:
          <span className='scaleNumber percent'>{percent}%</span>
        </label>
        <input
          id={valueToModify}
          type='range'
          name={group}
          max='100'
          min='1'
          defaultValue={percent}
          onMouseUp={handleMouseUp}
          onChange={handleChange}
        />
        {size && <p className='rangeSize sizeCompressed'>- {formatBytes(sizeOG - size, 2)}</p>}
      </div>
    )
  }

  return [InputRange, percent]
}
