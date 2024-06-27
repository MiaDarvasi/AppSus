
export function NoteVideo({ videoUrl, title }) {
  return (
    <div className="note-video">
      <video controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
      <p>{title}</p>
    </div>
  )
}
