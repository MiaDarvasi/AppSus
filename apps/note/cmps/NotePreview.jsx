import { NoteTxt } from '../cmps/NoteTxt.jsx'
import { NoteTodos } from '../cmps/NoteTodos.jsx'
import { NoteImg } from '../cmps/NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteAudio } from './NoteAudio.jsx'
import { NoteCanvas } from './NoteCanvas.jsx'
import { NoteMap } from './NoteMap.jsx'

const { useState, useRef } = React

const componentMap = {
  NoteTxt: NoteTxt,
  NoteTodos: NoteTodos,
  NoteImg: NoteImg,
  NoteVideo: NoteVideo,
  NoteAudio: NoteAudio,
  NoteCanvas: NoteCanvas,
  NoteMap: NoteMap,
}

export function NotePreview({ note, updateNoteColor, toggleNotePinned, deleteNote, duplicateNote, updateNote }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(note.info.txt || '')
  const [newTodoText, setNewTodoText] = useState('')
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false)

  const handleColorChange = (color) => {
    updateNoteColor(note.id, color)
    setIsColorMenuOpen(false)
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

  const toggleEdit = () => {
    setIsEditing(!isEditing)
    setEditedContent(note.info.txt || '')
  }

  const handleContentChange = (e) => {
    setEditedContent(e.target.value)
  }

  const handleSave = () => {
    updateNote(note.id, { ...note.info, txt: editedContent })
    setIsEditing(false)
  }

  const handleTodoChange = (index, value) => {
    const updatedTodos = [...note.info.todos]
    updatedTodos[index].txt = value
    updateNote(note.id, { ...note.info, todos: updatedTodos })
  }

  const handleTodoDelete = (index) => {
    const updatedTodos = note.info.todos.filter((_, i) => i !== index)
    updateNote(note.id, { ...note.info, todos: updatedTodos })
  }

  const handleAddTodo = () => {
    if (!newTodoText) return
    const newTodo = { txt: newTodoText, doneAt: null }
    const updatedTodos = [...(note.info.todos || []), newTodo]
    updateNote(note.id, { ...note.info, todos: updatedTodos })
    setNewTodoText('')
  }

  const NoteComponent = componentMap[note.type]

  if (!NoteComponent) {
    return null
  }

  return (
    <div className="note-preview" style={note.style}>
      <div onClick={() => setIsEditing(true)}>
        {isEditing ? (
          note.type === 'NoteTodos' ? (
            <div className="todos-edit">
              <h3>{note.info.title}</h3>
              <ul>
                {note.info.todos && Array.isArray(note.info.todos) ? (
                  note.info.todos.map((todo, index) => (
                    <li key={index}>
                      <input
                        type="text"
                        value={todo.txt}
                        onChange={(e) => handleTodoChange(index, e.target.value)}
                      />
                      {todo.doneAt && <span>(done)</span>}
                      <button onClick={() => handleTodoDelete(index)}>Delete</button>
                    </li>
                  ))
                ) : (
                  <li>No todos</li>
                )}
              </ul>
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add new todo"
              />
              <button onClick={handleAddTodo}>Add Todo</button>
            </div>
          ) : (
            <textarea value={editedContent} onChange={handleContentChange} autoFocus />
          )
        ) : (
          <NoteComponent {...note.info} style={note.style} />
        )}
      </div>
      {!isEditing && (
        <div className="note-actions">
          <button onClick={toggleEdit}>Edit</button>
          <button onClick={handlePinToggle}>
            {note.isPinned ? <img src="assets/img/pin (1).png" alt="Unpin" /> : <img src="assets/img/pin.png" alt="Pin" />}
          </button>
          <button onClick={handleDelete}>
            <img src="assets/img/trash-solid.svg" alt="Delete" />
          </button>
          <button onClick={handleDuplicate}>
            <img src="assets/img/copy-regular (1).svg" alt="Duplicate" />
          </button>
          <div className="color-picker-container">
            <button onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}>
              <img src="assets/img/color-wheel.png" alt="Color Wheel" />
            </button>
            {isColorMenuOpen && (
              <div className="color-menu">
                {['#72DC59', '#5CDBD0', '#FFCDD2', '#DBA724', '#0855DB', '#4B72DC', '#B71C1C', '#212833', '#D50000'].map((color) => (
                  <button
                    key={color}
                    className="color-button"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {isEditing && (
        <div className="save-cancel-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}

