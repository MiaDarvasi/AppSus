export function NoteTodos({ title, todos,style }) {
    return (
        <div className="note-todos" style={style}>
            <h3>{title}</h3>
            <ul>
                {todos.map((todos, index) => (
                    <li key={index}>
                        {todos.txt} {todos.doneAt && <span>(done)</span>}
                    </li>
                ))}
            </ul>
        </div>
    )
}