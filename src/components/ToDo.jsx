import React, { useState, useEffect } from "react";
import "./ToDo.css";

function Todo() {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [input, setInput] = useState("");
  const [editTodoIndex, setEditTodoIndex] = useState(null);
  const [editTodoValue, setEditTodoValue] = useState("");
  const [sortBy, setSortBy] = useState("name");
 
  //accessibility
  const [dyslexicMode, setDyslexicMode] = useState(
    JSON.parse(localStorage.getItem("dyslexicMode")) || false
  );
  const [colorblindMode, setColorblindMode] = useState(
    JSON.parse(localStorage.getItem("colorblindMode")) || false
  );
  
  const addTodo = (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      setTodos([...todos, { task: input, completed: false }]);
      setInput("");
      localStorage.setItem(
        "todos",
        JSON.stringify([...todos, { task: input, completed: false }])
      );
    }
  };

  const deleteTodo = (index) => {
    let newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const saveEditTodo = (index) => {
    let newTodos = [...todos];
    newTodos[index].task = editTodoValue;
    setTodos(newTodos);
    setEditTodoIndex(null);
    setEditTodoValue("");
    localStorage.setItem(
      "todos",
      JSON.stringify([...todos, { task: input, completed: false }])
    );
  };

  const cancelEditTodo = () => {
    setEditTodoIndex(null);
    setEditTodoValue("");
  };

  const sortByKey = (key) => {
    let newTodos = [...todos];
    switch (key) {
      case "name":
        newTodos.sort((a, b) => a.task.localeCompare(b.task));
        break;
      case "reverse":
        newTodos.sort((a, b) => a.task.localeCompare(b.task)).reverse();
        break;
      default:
        break;
    }
    setTodos(newTodos);
    setSortBy(key);
  };

  const dyslexia = () => {
    setDyslexicMode(!dyslexicMode);
  };

  const colorblind = () => {
    setColorblindMode(!colorblindMode);
  };

  //Retrieve from local the todos and access saved
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
      setTodos(storedTodos);
    }

    const storedDyslexicMode = JSON.parse(localStorage.getItem("dyslexicMode"));
    if (storedDyslexicMode !== null) {
      setDyslexicMode(storedDyslexicMode);
    }

    const storedColorblindMode = JSON.parse(
      localStorage.getItem("colorblindMode")
    );
    if (storedColorblindMode !== null) {
      setColorblindMode(storedColorblindMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dyslexicMode", JSON.stringify(dyslexicMode));
    localStorage.setItem("colorblindMode", JSON.stringify(colorblindMode));
  }, [dyslexicMode, colorblindMode]);

  return (
    <div
      className={`container ${colorblindMode ? "colorblind" : ""} ${
        dyslexicMode ? "dyslexia" : ""
      }  `}
    >
      <div className="accessibility-buttons">
        <button className="dyslexia" onClick={dyslexia}>
          Dyslexic?
        </button>
        <button className="color-blind" onClick={colorblind}>
          Color-blind?
        </button>
      </div>
      <h1 className="title">TASKIFY</h1>
      <h2 className="subtitle"> Put order to your life</h2>
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
            Add Task
          </button>
        </form>
      </div>
      <div className="sort-by">
        <label>Sort by:</label>
        <select
          value={sortBy}
          onChange={(event) => sortByKey(event.target.value)}
        >
          <option value="name">Name</option>

          <option value="reverse">Reverse-Alphabetical</option>
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
                <button className="cancel-btn" onClick={() => cancelEditTodo()}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className="view-todo">
                <p>{todo.task}</p>
                {todo.completed}
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
