import { useEffect, useState } from 'react'

export default function useInputSize({ valueToModify, currentFile }) {
  const [value, setValue] = useState(undefined)

  function handleMouseUp(e) {
    setValue(+e.target.value)
  }

  useEffect(() => {
    if (!currentFile?.originalFilename) return

    const currentValue = currentFile[valueToModify]
    setValue(currentValue)
  }, [currentFile])

  function InputRange({ group, defaultValue }) {
    function handleChange(e) {
      // Put value in HTML
      const rangeSize = document.querySelector(`#${valueToModify} + .rangeSize`)
      rangeSize.textContent = `${e.target.value}px`

      // Calculate scale number and put in HTML
      const scaleNumber = document.querySelector(`.${valueToModify} .scaleNumber`)
      scaleNumber.textContent = `x${(e.target.value / defaultValue).toFixed(2)}`
    }

    const calculateScale = (value, decimals) => {
      return `x${(value / defaultValue).toFixed(decimals)}`
    }

    return (
      <div className={`inputContainer ${valueToModify}`}>
        <label htmlFor={valueToModify} className='inputName'>
          {valueToModify}:
          <span className='scaleNumber'>{calculateScale(value, 2)}</span>
        </label>
        <input
          id={valueToModify}
          type='range'
          name={group}
          max={defaultValue * 2}
          min='1'
          defaultValue={value}
          onMouseUp={handleMouseUp}
          onChange={handleChange}
        />
        <p className='rangeSize'>{value}px</p>
      </div>
    )
  }

  return [InputRange, value]
}
