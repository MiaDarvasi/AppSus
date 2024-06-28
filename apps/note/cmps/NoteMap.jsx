export function NoteMap({ title, location }) {
    const apiKey = 'AIzaSyBaRClBmmP7JbZ4YIuV5tMooPUxlcLOQtE'
    return (
        <div className="note-map">
            <h3>{title}</h3>
            <iframe
                title={title}
                width="100%"
                height="300"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`}
                allowFullScreen
            ></iframe>
        </div>
    )
}
