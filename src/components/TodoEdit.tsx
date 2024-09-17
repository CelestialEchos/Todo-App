import React, { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import todo from "../models/todo";

interface TodoEditProps {
  todo: todo;
  editTodo: (id: number) => void;
  editTodoContent: (id: number, newContent: string) => void;
}

function TodoEdit({ todo, editTodo, editTodoContent }: TodoEditProps) {
  const [content, setContent] = useState(todo.content);

  useEffect(() => {
    if (content !== todo.content) {
      editTodoContent(todo.id, content);
    }
  }, [content]);

  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  function handleChange(e: InputEvent) {
    setContent(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content) return;
    editTodo(todo.id);
  }

  return (
    <form onSubmit={handleSubmit} className="todoItem2" action="">
      <input
        onChange={handleChange}
        autoFocus
        className="todoItem-content-input"
        type="text"
        value={content}
        maxLength={15}
      ></input>
      <span onClick={handleSubmit} className="todoItem-edit">
        <DoneIcon />
      </span>
    </form>
  );
}

export default TodoEdit;
