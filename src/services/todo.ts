import axios from "axios";
import todo from "../models/todo";

class TodoService {
  http = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  async getAllTodos() {
    console.log(this.http);

    const response = await this.http.get<todo[]>("/todo");

    return response.data;
  }

  async getTodoById(id: number) {
    const response = await this.http.get<todo[]>("/todo/" + id);

    return response.data;
  }

  async addNewTodo(content: string) {
    const response = await this.http.post<todo>("/todo", { content });
    return response.data;
  }

  async removeTodo(id: number) {
    const response = await this.http.delete("/todo/" + id);
    return response.data;
  }

  async updateTodo(id: number, content?: string, hasCompleted?: boolean) {
    const response = await this.http.patch("/todo/" + id, {
      content,
      hasCompleted: hasCompleted,
    });
    return response.data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TodoService();
