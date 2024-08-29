// Todos.jsx
import { useState } from "react";
import "./Todos.css"; // Ensure this path is correct

export default function Todos() {
  const [Todo, setTodo] = useState("");
  const [Todos, setTodos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Todo.trim()) {
      // Prevent adding empty todos
      setTodos([...Todos, { text: Todo, completed: false }]);
      setTodo(""); // Clear the input field after submission
    }
  };

  const handleRemove = (index) => {
    const newTodos = Todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleToggleComplete = (index) => {
    const newTodos = Todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="todos-container">
      <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          onChange={(e) => setTodo(e.target.value)}
          value={Todo}
          type="text"
          className="todo-input"
          placeholder="Add a new todo"
        />
        <button type="submit" className="todo-button">
          Add
        </button>
      </form>
      <ul className="todo-list">
        {Todos.map((todo, index) => (
          <li
            key={index}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <span
              onClick={() => handleToggleComplete(index)}
              className="cursor-pointer"
            >
              {todo.text}
            </span>
            <button
              onClick={() => handleRemove(index)}
              className="remove-button"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
