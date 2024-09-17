import React, { useState } from "react";
import todo from "../models/todo";

interface TodoFormProps {
  lenOfList: number;
  AddTodo: (newTodo: todo) => void;
}

function TodoForm({ lenOfList, AddTodo }: TodoFormProps): JSX.Element {
  const [content, setContent] = useState("");

  type InputEvent = React.ChangeEvent<HTMLInputElement>;
  function handleChange(e: InputEvent) {
    setContent(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content) return;
    let newTodo: todo = {
      id: lenOfList + 1,
      content: content,
      isCompleted: false,
      isEditing: false,
    };
    AddTodo(newTodo);
    setContent("");
  }
  return (
    <form onSubmit={handleSubmit} className="todoForm" action="">
      <input
        autoFocus
        value={content}
        onChange={handleChange}
        placeholder="What is the task today?"
        maxLength={15}
      ></input>
      <button onClick={handleSubmit}>Add task</button>
    </form>
  );
}

export default TodoForm;
