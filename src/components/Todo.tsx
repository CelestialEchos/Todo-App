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

const Todo = (props: TodoProps) => {
  const { todo, deleteTodo, handleEdit, editTodoIsCompleted } = props;
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);

  useEffect(() => {
    if (todo.isCompleted !== isCompleted) {
      editTodoIsCompleted(todo.id, isCompleted);
    }
  }, [isCompleted, editTodoIsCompleted, todo.id, todo.isCompleted]);

  function handleClick() {
    setIsCompleted(!isCompleted);
    console.log(isCompleted);
  }

  return (
    <div className="todoItem">
      <input
        onClick={handleClick}
        className="todoItem-input"
        type="checkbox"
        defaultChecked={todo.isCompleted ? true : false}
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
};

export default Todo;
