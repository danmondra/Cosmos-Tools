export function BtnsProportions({ proportions, resizeImage }) {
  return (
    <div className='proportionBtns'>
      {proportions.map(n => (
        <button
          key={n}
          className='proportionBtn'
          onClick={(e) => {
            e.preventDefault()

            resizeImage(n)
          }}
        >
          x{n.toString()}
        </button>
      ))}
    </div>

  )
}
