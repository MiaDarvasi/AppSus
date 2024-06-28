
export function NoteTodos({ title, todos, style }) {
  return (
    <div className="note-todos" style={style}>
      <h3>{title}</h3>
      <ul>
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <li key={index}>
              {todo.txt} {todo.doneAt && <span>(done)</span>}
            </li>
          ))
        ) : (
          <li>click to add todos</li>
        )}
      </ul>
    </div>
  );
}
