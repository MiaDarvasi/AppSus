const { useState } = React

export function NoteInput({ onAddNote }) {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleAddNoteClick = () => {
        if (inputText.trim() !== '') {
            const newNote = {
                id: generateUniqueId(),
                createdAt: Date.now(),
                type: 'NoteTxt', // Example type for text notes
                isPinned: false,
                style: { backgroundColor: '#fff' }, // Default background color
                info: { txt: inputText }, // Note content
            };
            onAddNote(newNote); // Invoke the callback with the new note
            setInputText(''); // Clear the input field after adding the note
        }
    };

    const generateUniqueId = () => {
        return Date.now().toString();
    };

    return (
        <div className="note-input">
            <textarea
                placeholder="Take a note..."
                value={inputText}
                onChange={handleInputChange}
                autoFocus
            />
            <button onClick={handleAddNoteClick}>Add</button>
        </div>
    );
}
