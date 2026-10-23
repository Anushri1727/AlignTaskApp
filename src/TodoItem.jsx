function TodoItem({todo, onToggle, onDelete, onEdit}){
    return (
        <li>
            <input
            type="checkbox"
            checked={todo.completed}
            onChange={()=> onToggle(todo.id)}
            />
            <span style={{textDecoration: todo.completed ? "line-through" : "none"}}>{todo.title}</span>
            {" - "}
            {todo.priority}

            <button onClick={()=> onDelete(todo.id)}>Delete</button>
            <button onClick={()=> onEdit(todo)}>Edit</button>
        </li>
    )
}
export default TodoItem