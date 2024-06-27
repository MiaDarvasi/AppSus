export function NoteVideo({ videoUrl, title, autoplay, loop,style }) {
    return (
        <div className="note-video">
            <video controls autoPlay={autoplay} loop={loop} style={style}>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <p>{title}</p>
        </div>
    );
}
