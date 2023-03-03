export function ToolInfo({ name, description }) {
  return (
    <div style={{ height: '32.4px' }}>
      <div>
        <h2 className='constellationName'>{name}</h2>
        <p className='constellationInfo'>{description}</p>
      </div>
    </div>
  )
}
