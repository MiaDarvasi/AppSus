import { NotePreview } from '../cmps/NotePreview.jsx'
import { noteService } from '../services/note.service.js'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { AddButton } from '../cmps/AddButton.jsx'

const { useState, useEffect } = React


export function NoteIndex() {
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])

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

  const filterBy = (filter) => {
    const { searchText, type } = filter
    let filtered = notes.filter(note => {
      const titleMatch = note.title && note.title.toLowerCase().includes(searchText.toLowerCase())
      const textMatch = note.text && note.text.toLowerCase().includes(searchText.toLowerCase())
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

  const handleAddNote = () => {
    const newNote = {
      id: generateUniqueId(),
      createdAt: Date.now(),
      type: 'NoteTxt',
      isPinned: false,
      style: { backgroundColor: '#fff' },
      info: { txt: 'New Note' },
    }
    const updatedNotes = [...notes, newNote]
    setNotes(updatedNotes)
    setFilteredNotes(updatedNotes)
  }



  return (
    <div className="note-index">
      <NoteFilter filterBy={filterBy} clearFilters={clearFilters} />
      <AddButton onAddNote={handleAddNote} />
      <div className="note-index-preview">
        {filteredNotes.map(note => (
          <NotePreview
            key={note.id}
            note={note}
            updateNoteColor={updateNoteColor}
            toggleNotePinned={toggleNotePinned}
            deleteNote={deleteNote}
            duplicateNote={duplicateNote}
          />
        ))}
      </div>
    </div>
  )
}