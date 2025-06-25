import React from "react";
import { Todo } from "./components/Todo";
import { Mytodo } from "./components2/Mytodo";
import Expense from "./Expense/Expense";
import "./app.css";
const App = () => {
  return (
    <div>
      {/* <Todo /> */}
      {/* <Mytodo /> */}
      <Expense />
    </div>
  );
};

export default App;
