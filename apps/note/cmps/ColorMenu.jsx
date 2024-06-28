const { useState } = React

export function ColorMenu({ onColorChange }) {
  const colors = ['#FFFFFF', '#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C', '#FF8A80', '#FF5252', '#FF1744', '#D50000'];

  return (
    <div className="color-menu">
      {colors.map(color => (
        <button
          key={color}
          className="color-button"
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  );
}