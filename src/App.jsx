import { useEffect, useState } from 'react'
import './App.css'
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState(()=> {
    const savedTodos = localStorage.getItem("my_todo_list");
    return savedTodos ? JSON.parse(savedTodos) : []
  });
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null)

  useEffect(()=> {
    localStorage.setItem("my_todo_list", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() == "") return;

    if (editingId !== null) {
      setTodos((prevTodos)=> 
        prevTodos.map((todo)=> 
        todo.id === editingId
      ? {...todo, title: title.trim()} : todo)
      )
      setEditingId(null)
    }else {
    const newTodo = {
      id: Date.now(), 
      title:title.trim(),
      completed: false
    };
    setTodos(prevTodos => [...prevTodos, newTodo]);
      }
    setTitle("")
  }

  function handleToggle(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  function handleDelete(id){
    setTodos((prevTodos)=> 
    prevTodos.filter((todo)=> todo.id !== id))
  }

  function handleEdit(todo){
    setTitle(todo.title);
    setEditingId(todo.id)
  }

  return (
    <main>
      <h1>My Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">{editingId !== null ? "save": "Add Todo"}</button>
      </form>
      <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} onEdit={handleEdit}/>
      <p>Total tasks: {todos?.length}</p>
    </main>
  )
}

export default App
