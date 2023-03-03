import { useState } from 'react'

export default function useInputRange({ defaultValue }) {
  const [value, setValue] = useState(defaultValue)

  function handleChange(e) {
    setValue(e.target.value)
  }

  function InputRange({ valueToModify, group, scale }) {
    return (
      <div className='inputContainer'>
        <label htmlFor={valueToModify} className='inputName'>
          {valueToModify}:
          <span className='scaleNumber'>x{scale}</span>
        </label>
        <input
          id={valueToModify}
          type='range'
          name={group}
          max={defaultValue * 3}
          min='0'
          defaultValue={value}
          onMouseUp={handleChange}
        />
        <p className='rangeSize'>{value}px</p>
      </div>
    )
  }

  return [InputRange, value]
}
