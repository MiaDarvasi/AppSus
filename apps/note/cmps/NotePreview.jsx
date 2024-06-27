import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { ColorInput } from './ColorInput.jsx'
const componentMap = {
  NoteTxt: NoteTxt,
  NoteTodos: NoteTodos,
  NoteImg: NoteImg,
}

export function NotePreview({ note, updateNoteColor, toggleNotePinned, deleteNote }) {
  const NoteComponent = componentMap[note.type]
  if (!NoteComponent) {
    return null
  }

  const handleColorChange = color => {
    updateNoteColor(note.id, color)
  }

  const handlePinToggle = () => {
    toggleNotePinned(note.id)
  }

  const handleDelete = () => {
    deleteNote(note.id)
  }

  return (
    <div className="note-preview" >
      <NoteComponent {...note.info} style={note.style} />
      <div className="note-actions">
        <button onClick={() => handleColorChange('#1BE3C0')}>Change Color</button>
        <button onClick={handlePinToggle}>{note.isPinned ? 'Unpin' : 'Pin'}</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>

  )
}

