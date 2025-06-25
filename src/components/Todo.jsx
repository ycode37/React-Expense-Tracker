import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";

export const Todo = () => {
  const [Task, setTask] = useState(() => {
    const rawTodo = localStorage.getItem("reacTask");
    if (!rawTodo) return [];
    return JSON.parse(rawTodo);
  });

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;
    if (!content) return;

    const isincluded = Task.some((curElem) => curElem.content === content);
    if (isincluded) return;

    setTask((prev) => [
      ...prev,
      { id: id, content: content, checked: checked },
    ]);
  };

  const handleDeleteTodo = (taskContent) => {
    const updatedTask = Task.filter(
      (curElem) => curElem.content !== taskContent
    );
    setTask(updatedTask);
  };

  const handleClearTodoData = () => {
    setTask([]);
  };

  const handleCheckTodo = (taskValue) => {
    const updatedTask = Task.map((curtask) => {
      if (curtask.content === taskValue) {
        return { ...curtask, checked: !curtask.checked };
      } else {
        return curtask;
      }
    });
    setTask(updatedTask);
  };

  localStorage.setItem("reacTask", JSON.stringify(Task));

  return (
    <section className="todo-container">
      <header>
        <h1>To-do list</h1>
        <TodoDate />
      </header>
      <TodoForm onAddTodo={handleFormSubmit} />
      <section>
        <ul>
          {Task.map((val) => {
            return (
              <TodoList
                key={val.id}
                data={val.content}
                ondelete={handleDeleteTodo}
                oncheck={handleCheckTodo}
                checked={val.checked}
              />
            );
          })}
        </ul>
        <button onClick={handleClearTodoData}>Clear ALL</button>
      </section>
    </section>
  );
};
