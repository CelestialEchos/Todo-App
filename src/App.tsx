import React, { useState } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import todo from "./models/todo";
import TodoEdit from "./components/TodoEdit";

function App() {
  const [todos, setTodos] = useState<todo[]>([]);
  // const [isEditing, setIsEditing] = useState(false);

  const len = todos.length;
  const sortedItems: todo[] = todos.sort((a, b) => a.id - b.id);

  function addTodo(newTodo: todo): void {
    setTodos([newTodo, ...todos]);
  }

  function deleteTodo(id: number): void {
    setTodos([...todos].filter((item) => item.id !== id));
  }

  function editTodo(id: number): void {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  function editTodoContent(id: number, newContent: string): void {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, content: newContent } : todo
      )
    );
  }

  function editTodoIsCompleted(id: number, state: boolean): void {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: state } : todo
      )
    );
  }

  return (
    <div className="App">
      <div className="todoWrapper ">
        <h1>Get Things Done!</h1>
        <TodoForm lenOfList={len} AddTodo={addTodo} />
        {sortedItems.map((todo) =>
          !todo.isEditing ? (
            <Todo
              deleteTodo={deleteTodo}
              handleEdit={editTodo}
              editTodoIsCompleted={editTodoIsCompleted}
              key={todo.id}
              todo={todo}
            />
          ) : (
            <TodoEdit
              editTodo={editTodo}
              editTodoContent={editTodoContent}
              key={todo.id}
              todo={todo}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
