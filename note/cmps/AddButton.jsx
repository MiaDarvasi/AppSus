
export function AddButton({ onAddNote }) {
    return (
      <button onClick={onAddNote} className="add-note-btn">
        Add Note
      </button>
    )
  }