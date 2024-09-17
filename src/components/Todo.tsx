import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import todo from "../models/todo";
import { useEffect, useState } from "react";

interface TodoProps {
  todo: todo;
  deleteTodo: (id: number) => void;
  handleEdit: (id: number) => void;
  editTodoIsCompleted: (id: number, state: boolean) => void;
}

function Todo({
  todo,
  deleteTodo,
  handleEdit,
  editTodoIsCompleted,
}: TodoProps) {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  useEffect(() => {
    editTodoIsCompleted(todo.id, isCompleted);
  }, [isCompleted]);

  function handleClick() {
    setIsCompleted(!isCompleted);
  }

  return (
    <div className="todoItem">
      <input
        onClick={handleClick}
        className="todoItem-input"
        type="checkbox"
      ></input>
      <p
        className="todoItem-content-p"
        style={{
          textDecorationLine: todo.isCompleted ? "line-through" : "none",
        }}
      >
        {todo.content}
      </p>
      <span
        onClick={() => {
          handleEdit(todo.id);
        }}
        className="todoItem-edit"
      >
        <EditIcon />
      </span>
      <span
        onClick={() => {
          deleteTodo(todo.id);
        }}
        className="todoItem-delete"
      >
        <DeleteIcon />
      </span>
    </div>
  );
}

export default Todo;
