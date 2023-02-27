import React, { useState } from "react";
import "./ToDo.css";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const addTodo = (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      setTodos([...todos, { task: input, completed: false }]);
      setInput("");
    }
  };

  const deleteTodo = (index) => {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
 
  const saveEditTodo = (index) => {
    let newTodos = [...todos];
    newTodos[index].task = editTodoValue;
    setTodos(newTodos);
    setEditTodoIndex(null);
    setEditTodoValue("");
  };

  const cancelEditTodo = () => {
    setEditTodoIndex(null);
    setEditTodoValue("");
  };

  const toggleComplete = (index) => {
    let newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const sortByKey = (key) => {
    let newTodos = [...todos];
    switch (key) {
      case "name":
        newTodos.sort((a, b) => a.task.localeCompare(b.task));
        break;
      case "dueDate":
        newTodos.sort((a, b) =>
          a.dueDate === null
            ? 1
            : b.dueDate === null
            ? -1
            : a.dueDate.localeCompare(b.dueDate)
        );
        break;
      case "alphabetical":
        newTodos.sort((a, b) => a.task.localeCompare(b.task)).reverse();
        break;
      default:
        break;
    }
    setTodos(newTodos);
    setSortBy(key);
  };

  return (
    <div className="container">
      <h1 className="title">Taskify</h1>
      <div className="todo-form">
        <form>
          <input
            className="input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="What do you have to do?"
          />
          <button className="add-btn" onClick={addTodo}>
            Add
          </button>
        </form>
      </div>
      <div className="sort-by">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(event) => sortByKey(event.target.value)}>
          <option value="name">Name</option>
          <option value="dueDate">Due Date</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : ""}>
            {editTodoIndex === index ? (
              <div className="edit-todo">
                <input
                  className="edit-input"
                  type="text"
                  value={editTodoValue}
                  onChange={(event) => setEditTodoValue(event.target.value)}
                />
                <button
                  className="save-btn"
                  onClick={() => saveEditTodo(index)}
                >
                  Save
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => cancelEditTodo()}
                >
                  Cancel
                </button>
              </div>
            ) : (
  <div className="view-todo">
  <p onClick={() => toggleComplete(index)}>{todo.task}</p>
  {todo.completed && <span className="check-mark">&#10004;</span>}
  <div className="buttons">
    <button
      className="edit-btn"
      onClick={() => {
        setEditTodoIndex(index);
        setEditTodoValue(todo.task);
      }}
    >
      Edit
    </button>
    <button
      className="delete-btn"
      onClick={() => deleteTodo(index)}
    >
      Delete
    </button>
  </div>
</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;