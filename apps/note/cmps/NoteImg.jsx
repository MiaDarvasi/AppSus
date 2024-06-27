

export function NoteImg({ url, title, style }) {
  return (
    <div className="note-img" style={style}>
      <img src={url} />
      <p>{title}</p>
    </div>
  )
}
