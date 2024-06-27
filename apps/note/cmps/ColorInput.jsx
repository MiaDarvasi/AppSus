export function ColorInput({ onSetColor, backgroundColor }) {
    const colors = [
      '#F44236',
      '#9C27B0',
      '#3F51B5',
      '#2196F3',
      '#4caf50',
      '#101010',
    ]
  
    const handleColorChange = (color) => {
      onSetColor(color) // Call the onSetColor prop function with selected color
    }
  
    return (
      <section className="color-input">
        <div className="items-container">
          {colors.map((color) => (
            <div
              className={`item ${color === backgroundColor ? 'chosen' : ''}`}
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)}
            />
          ))}
        </div>
      </section>
    )
  }