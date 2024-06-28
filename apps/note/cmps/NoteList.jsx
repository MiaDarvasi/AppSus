import { NotePreview } from './NotePreview.jsx'
export function NoteList({ notes, updateNoteColor, toggleNotePinned, deleteNote, duplicateNote, updateNote }) {
    return (
      <div className="note-list">
        {notes.map((note) => (
          <NotePreview
            key={note.id}
            note={note}
            updateNoteColor={updateNoteColor}
            toggleNotePinned={toggleNotePinned}
            deleteNote={deleteNote}
            duplicateNote={duplicateNote}
            updateNote={updateNote}
          />
        ))}
      </div>
    )
  }