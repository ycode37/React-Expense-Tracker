import { useState } from "react";
import { Mytodoform } from "./Mytodoform";

export const Mytodo = () => {
  const [Tasks, setTasks] = useState(() => {
    const rawTodo = localStorage.getItem("MyTasks");
    if (!rawTodo) return [];
    return JSON.parse(rawTodo);
  });

  const textPrint = (inputValue) => {
    const { id, content, checked } = inputValue;
    if (!content) return;

    setTasks((prev) => [
      ...prev,
      { id: id, content: content, checked: checked },
    ]);
  };

  const handleDelete = (idx) => {
    const deleteTask = Tasks[idx];
    console.log(deleteTask);
    setTasks(Tasks.filter((_, i) => i !== idx));
  };
  localStorage.setItem("MyTasks", JSON.stringify(Tasks));
  return (
    <section>
      <header>
        <h1>Todo</h1>
        <h2>Time</h2>
      </header>
      <section>
        <Mytodoform onaddTodo={textPrint} />
        <section>
          <ul>
            {Tasks.map((task, idx) => {
              return (
                <li key={idx}>
                  {task}
                  <button onClick={() => handleDelete(idx)}>Delete</button>
                  <button>Done</button>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </section>
  );
};
