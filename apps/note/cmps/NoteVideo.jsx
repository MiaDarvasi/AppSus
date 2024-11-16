export function NoteVideo({ videoUrl, title, autoplay, loop,style }) {
    return (
        <div className="note-video">
            <video controls autoPlay={autoplay} loop={loop} style={style}>
            <p>{title}</p>
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    );
}
