const { useState } = React

export function NoteInput({ onAddNote }) {
  const [text, setText] = useState('')
  const [noteType, setNoteType] = useState('NoteTxt') 

  const handleAddClick = () => {
    if (text.trim() !== '') {
      onAddNote(text, noteType)
      setText('')
    }
  }

  return (
    <div className="note-input">
      <input
        type="text"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
        <option value="NoteTxt">Text</option>
        <option value="NoteTodos">Todo</option>
        <option value="NoteCanvas">Canvas</option>
      </select>
      <button onClick={handleAddClick}>Add Note</button>
    </div>
  )
}
