import { useState } from "react";

export const Mytodoform = ({ onaddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (value) => {
    setInputValue({ id: value, content: value, checked: false });
  };

  const textPrint = (e) => {
    e.preventDefault();
    onaddTodo(inputValue);
    setInputValue({ content: "" });
  };

  return (
    <main>
      <form onSubmit={textPrint}>
        <input
          value={inputValue.content}
          type="text"
          placeholder="Add Task"
          onChange={(e) => handleInputValue(e.target.value)}
        />
        <button type="submit">Click</button>
      </form>
    </main>
  );
};
