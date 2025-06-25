import { IoMdCheckmark } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export const TodoList = ({ data, ondelete, checked, oncheck }) => {
  return (
    <li>
      <span className={checked ? "checked" : "notchecked"}>{data}</span>
      <button onClick={() => oncheck(data)}>
        <IoMdCheckmark />
      </button>
      <button onClick={() => ondelete(data)}>
        <MdDelete />
      </button>
    </li>
  );
};
