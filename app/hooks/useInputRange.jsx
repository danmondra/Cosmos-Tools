import { useState } from 'react'

export default function useInputRange() {
  const [value, setValue] = useState(undefined)

  function handleMouseUp(e) {
    setValue(+e.target.value)
  }

  function InputRange({ valueToModify, group, defaultValue }) {
    function handleChange(e) {
      // Put value in HTML
      const rangeSize = document.querySelector(`#${valueToModify} + .rangeSize`)
      rangeSize.textContent = `${e.target.value}px`

      // Calculate scale number and put in HTML
      const scaleNumber = document.querySelector(`.${valueToModify} .scaleNumber`)
      scaleNumber.textContent = `x${(e.target.value / defaultValue).toFixed(2)}`
    }

    return (
      <div className={`inputContainer ${valueToModify}`}>
        <label htmlFor={valueToModify} className='inputName'>
          {valueToModify}:
          <span className='scaleNumber'>x{value ? (value / defaultValue).toFixed(2) : 1}</span>
        </label>
        <input
          id={valueToModify}
          type='range'
          name={group}
          max={defaultValue * 3}
          min='1'
          defaultValue={value || defaultValue}
          onMouseUp={handleMouseUp}
          onChange={handleChange}
        />
        <p className='rangeSize'>{value || defaultValue}px</p>
      </div>
    )
  }

  return [InputRange, value]
}
