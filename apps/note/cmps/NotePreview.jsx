import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { ColorInput } from './ColorInput.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteAudio } from './NoteAudio.jsx'
import { NoteCanvas } from './NoteCanvas.jsx'
import { NoteMap } from './NoteMap.jsx'
const { useState } = React

const componentMap = {
  NoteTxt: NoteTxt,
  NoteTodos: NoteTodos,
  NoteImg: NoteImg,
  NoteVideo: NoteVideo,
  NoteAudio: NoteAudio,
  NoteCanvas: NoteCanvas,
  NoteMap: NoteMap
}

export function NotePreview({ note, updateNoteColor, toggleNotePinned, deleteNote, duplicateNote,onEditNote  }) {

  const NoteComponent = componentMap[note.type]
  const [selectedColor, setSelectedColor] = useState('#1BE3C0')


  if (!NoteComponent) {
    return null
  }

  const handleColorChange = () => {
    updateNoteColor(note.id, selectedColor)
  }

  const handlePinToggle = () => {
    toggleNotePinned(note.id)
  }

  const handleDelete = () => {
    deleteNote(note.id)
  }

  const handleDuplicate = () => {
    duplicateNote(note.id)
  }
  return (
    <div className="note-preview" >
      <NoteComponent {...note.info} style={note.style} />
      <div className="note-actions">
      <input
          type="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        />
        <button onClick={handleColorChange}>Change Color</button>
        <button onClick={() => toggleNotePinned(note.id)}>
          {note.isPinned ? 'Unpin' : 'Pin'}
        </button>
        {/* <button onClick={handlePinToggle}>{note.isPinned ? 'Unpin' : 'Pin'}</button> */}
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleDuplicate}>Copy</button>
      </div>
    </div>
  )
}

