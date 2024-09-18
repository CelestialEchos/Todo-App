import React, { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import TodoEdit from "./components/TodoEdit";
import todoService from "./services/todo";

interface TodoItem {
  id: number;
  content: string;
  hasCompleted: boolean;
  isEditing: boolean;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const todos = await todoService.getAllTodos();
    setTodos(todos);
  };

  const sortedItems: TodoItem[] = todos.sort((a, b) => a.id - b.id);

  const addTodo = async (content: string) => {
    const newTodo = await todoService.addNewTodo(content);
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = async (id: number) => {
    await todoService.removeTodo(id);
    setTodos([...todos].filter((item) => item.id !== id));
  };

  const editTodo = async (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTodoContent = async (id: number, newContent: string) => {
    await todoService.updateTodo(id, newContent);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, content: newContent } : todo
      )
    );
  };

  const editTodoHasCompleted = async (id: number, state: boolean) => {
    await todoService.updateTodo(id, undefined, state);

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, hasCompleted: state } : todo
      )
    );
  };

  return (
    <div className="App">
      <div className="todoWrapper ">
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo} />
        {sortedItems.map((todo) =>
          !todo.isEditing ? (
            <Todo
              deleteTodo={deleteTodo}
              handleEdit={editTodo}
              editTodoHasCompleted={editTodoHasCompleted}
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
