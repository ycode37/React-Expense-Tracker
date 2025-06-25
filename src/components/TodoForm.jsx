import { useState } from "react";

export const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setinputValue] = useState({ content: "" });

  const handleInputChange = (value) => {
    setinputValue({ id: value, content: value, checked: false });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onAddTodo(inputValue);
    setinputValue({ content: "" });
  };

  return (
    <section className="form">
      <form onSubmit={handleFormSubmit}>
        <div>
          <input
            autoComplete="off"
            type="text"
            className="todo-input"
            value={inputValue.content}
            onChange={(event) => handleInputChange(event.target.value)}
          />
        </div>
        <div>
          <button type="submit"> Add Task</button>
        </div>
      </form>
    </section>
  );
};
