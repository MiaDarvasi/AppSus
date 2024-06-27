import { NotePreview } from '../cmps/NotePreview.jsx'
import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React


export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filteredNotes, setFilteredNotes] = useState([])

    useEffect(() => {
        const fetchNotes = () => {
            noteService.query()
                .then(fetchedNotes => {
                    if (fetchedNotes.length === 0) {
                        return noteService.initializeNotes()
                    } else {
                        return fetchedNotes
                    }
                })
                .then(initializedNotes => {
                    setNotes(initializedNotes)
                    setFilteredNotes(initializedNotes)
                })

        }
        fetchNotes()
    }, [])
    const updateNoteColor = (noteId, color) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === noteId ? { ...note, style: { ...note.style, backgroundColor: color } } : note
            )
        )
    }

    const toggleNotePinned = (noteId) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
            )
        )
    }

    const deleteNote = (noteId) => {
        setNotes((prevNotes) =>
            prevNotes.filter((note) => note.id !== noteId)
        )
    }
    const handleFilter = (filter) => {
        let filtered = notes

        if (filter.title) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(filter.title.toLowerCase())
            )
        }
        setFilteredNotes(filtered)
    }
    return (
        <div className="note-index">
            {notes.map(note => (
                <NotePreview key={note.id} note={note} updateNoteColor={updateNoteColor} toggleNotePinned={toggleNotePinned} deleteNote={deleteNote} />
            ))}
        </div>
    )
}