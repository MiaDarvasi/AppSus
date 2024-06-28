const { useState } = React

export function NoteInput({ onAddNote }) {
  const [text, setText] = useState('');
  const [noteType, setNoteType] = useState('NoteTxt');

  const handleAddNote = () => {
    onAddNote(text, noteType);
    setText('');
  };

  return (
    <div className="note-input">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your note text..."
      />
      <select value={noteType} onChange={(e) => setNoteType(e.target.value)}>
        <option value="NoteTxt">Text</option>
        <option value="NoteTodos">Todos</option>
        <option value="NoteImage">Image</option> {/* Fixed "image" to "Image" */}
      </select>
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
}
