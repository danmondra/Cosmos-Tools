export function ToolInfo({ name, description }) {
  return (
    <div className='constellationNameContainer'>
      <div>
        <h2 className='constellationName'>{name}</h2>
        <p className='constellationInfo'>{description}</p>
      </div>
    </div>
  )
}
