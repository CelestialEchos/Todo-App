import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import TodoForm from "./components/TodoForm";
import Todo from "./components/Todo";
import todo from "./models/todo";
import TodoEdit from "./components/TodoEdit";
import todoService from "./services/todo";

function App() {
  const [todos, setTodos] = useState<todo[]>([]);
  // const [isEditing, setIsEditing] = useState(false);

  //load todos
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const todos = await todoService.getAllTodos();

    setTodos(todos);
    console.log(todos);
  };
  const sortedItems: todo[] = todos.sort((a, b) => a.id - b.id);

  const addTodo = async (content: string) => {
    const newTodo = await todoService.addNewTodo(content);
    setTodos([newTodo, ...todos]);
  };
  // function addTodo(newTodo: todo): void {
  //   setTodos([newTodo, ...todos]);
  // }

  const deleteTodo = async (id: number) => {
    await todoService.removeTodo(id);
    setTodos([...todos].filter((item) => item.id !== id));
  };

  // function deleteTodo(id: number): void {
  //   setTodos([...todos].filter((item) => item.id !== id));
  // }

  const editTodo = async (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };
  // function editTodo(id: number): void {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
  //     )
  //   );
  // }
  const editTodoContent = async (id: number, newContent: string) => {
    await todoService.updateTodo(id, newContent);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, content: newContent } : todo
      )
    );
  };
  // function editTodoContent(id: number, newContent: string): void {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, content: newContent } : todo
  //     )
  //   );
  // }

  const editTodoIsCompleted = useCallback(
    async (id: number, state: boolean) => {
      const result = await todoService.updateTodo(id, undefined, state);

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: state } : todo
        )
      );
    },
    [todos]
  );

  // const editTodoIsCompleted = async (id: number, state: boolean) => {
  //   await todoService.updateTodo(id, undefined, state);
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isCompleted: state } : todo
  //     )
  //   );
  // };

  // function editTodoIsCompleted(id: number, state: boolean): void {
  //   setTodos(
  //     todos.map((todo) =>
  //       todo.id === id ? { ...todo, isCompleted: state } : todo
  //     )
  //   );
  // }

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
