import { NoteList } from '../cmps/NoteList.jsx'
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteInput } from '../cmps/NoteInput.jsx'
import { NavBar } from '../cmps/navBar.jsx'
import { HeaderNote } from "../cmps/HeaderNote.jsx"
const { useState, useEffect,useRef } = React


export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [selectedColor, setSelectedColor] = useState('#FFFFFF')
  const colorPickerRef = useRef(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = () => {
    noteService.query()
      .then(fetchedNotes => {
        if (fetchedNotes.length === 0) {
          return noteService.initializeNotes()
        }
        return fetchedNotes
      })
      .then(initializedNotes => {
        setNotes(initializedNotes)
        setFilteredNotes(initializedNotes)
      })
      .catch(error => {
        console.error('Error fetching notes:', error)
      })
  }

  const updateNoteColor = (noteId, color) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: color } } : note
    )
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes)
  }

  const updateNote = (noteId, updatedInfo) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId ? { ...note, info: updatedInfo } : note
    )
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes)
  }

  const toggleNotePinned = (noteId) => {
    const updatedNotes = notes.map(note =>
      note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
    )
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes)
    sortNotes(updatedNotes)
  }

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId)
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes)
  }

  const duplicateNote = (noteId) => {
    const noteToDuplicate = notes.find(note => note.id === noteId)
    if (noteToDuplicate) {
      const duplicatedNote = {
        ...noteToDuplicate,
        id: generateUniqueId(),
        title: `Copy of ${noteToDuplicate.title}`,
      }
      const updatedNotes = [...notes, duplicatedNote]
      setNotes(updatedNotes)
      setFilteredNotes(updatedNotes)
    }
  }

  const generateUniqueId = () => {
    return Date.now().toString()
  }

  const filterBy = (searchText, type) => {
    let filtered = notes.filter(note => {
      const titleMatch = note.title && note.title.toLowerCase().includes(searchText.toLowerCase())
      const textMatch = note.info && note.info.txt && note.info.txt.toLowerCase().includes(searchText.toLowerCase())
      const typeMatch = type === 'all' || note.type === type
      return (titleMatch || textMatch) && typeMatch
    })
    setFilteredNotes(filtered)
  }

  const clearFilters = () => {
    setFilteredNotes(notes)
  }

  const sortNotes = (notesToSort) => {
    const sortedNotes = notesToSort.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return 0
    })
    setNotes(sortedNotes)
    setFilteredNotes(sortedNotes)
  }

  useEffect(() => {
    sortNotes(notes)
  }, [notes])

  const handleAddNote = (text, type) => {
    const newNote = {
      id: generateUniqueId(),
      createdAt: Date.now(),
      type: type, 
      isPinned: false,
      style: { backgroundColor: '' },
      info: type === 'NoteTodos' ? { title: '', todos: [] } : { txt: text }, 
    }
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes)
  }
 
  return (
    <div className="note-index">
      <HeaderNote />
      <button className="refresh-button" onClick={fetchNotes}><img src="assets/img/replay_24dp_FILL0_wght400_GRAD0_opsz24.svg" /></button>
      <button className="view-button"><img src="assets/img/view_agenda_24dp_FILL0_wght400_GRAD0_opsz24.svg" /></button>
      <button className="settings-button"><img src="assets/img/settings_24dp_FILL0_wght400_GRAD0_opsz24.svg" /></button>
      <button className="apps-button"><img src="assets/img/apps_24dp_FILL0_wght400_GRAD0_opsz24.svg" /></button>
      <div className="user">s</div>
      <NavBar />
      <NoteFilter filterBy={filterBy} clearFilters={clearFilters} />
      <NoteInput onAddNote={handleAddNote} />
      <NoteList
        notes={filteredNotes}
        updateNoteColor={updateNoteColor}
        toggleNotePinned={toggleNotePinned}
        deleteNote={deleteNote}
        duplicateNote={duplicateNote}
        updateNote={updateNote}
      />
    </div>
  )
}