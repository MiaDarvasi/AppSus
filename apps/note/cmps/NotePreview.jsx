import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteAudio } from './NoteAudio.jsx'
import { NoteCanvas } from './NoteCanvas.jsx'
import { NoteMap } from './NoteMap.jsx'

const { useState,useRef  } = React

const componentMap = {
  NoteTxt: NoteTxt,
  NoteTodos: NoteTodos,
  NoteImg: NoteImg,
  NoteVideo: NoteVideo,
  NoteAudio: NoteAudio,
  NoteCanvas: NoteCanvas,
  NoteMap: NoteMap,
}

export function NotePreview({ note, updateNoteColor, toggleNotePinned, deleteNote, duplicateNote }) {

  const NoteComponent = componentMap[note.type]
  const [selectedColor, setSelectedColor] = useState('#1BE3C0')


  if (!NoteComponent) {
    return null
  }
  const colorPickerRef = useRef(null)

  const handleColorChange = () => {
    if (colorPickerRef.current) {
      colorPickerRef.current.click();
    }  }

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
      <div className="color-picker-container">
    <input
      ref={colorPickerRef}
      type="color"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
      style={{ display: 'none' }}
    />
    <button onClick={handleColorChange}>
      <img src="assets/img/color-wheel.png" alt="Color Wheel" />
    </button>
  </div>
        <button onClick={() => toggleNotePinned(note.id)}>
          {note.isPinned ? <img src="assets/img/pin (1).png" /> : <img src="assets/img/pin.png" />}
        </button>
        <button onClick={handleDelete}><img src="assets/img/trash-solid.svg" /></button>
        <button onClick={handleDuplicate}><img src="assets/img/copy-regular (1).svg" /></button>
      </div>
    </div>
  )
}

