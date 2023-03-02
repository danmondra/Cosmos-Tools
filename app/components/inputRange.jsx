export function InputRange({ valueToModify, group, scale, defaultValue }) {
  return (
    <div className='inputContainer'>
      <label htmlFor={valueToModify} className='inputName'>
        {valueToModify}:
        <span className='scaleNumber'>x{scale}</span>
      </label>
      <input id={valueToModify} type='range' name={group} defaultValue={defaultValue} max={defaultValue * 3} min='0' />
      <p className='rangeSize'>{defaultValue}px</p>
    </div>
  )
}
