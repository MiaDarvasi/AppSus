export function NoteAudio({ url, title,style }) {
    return (
        <div className="note-audio" style={style}>
            <h3>{title}</h3>
            <audio controls>
                <source src={url} type="audio/mpeg" />
            </audio>
        </div>
    )
}