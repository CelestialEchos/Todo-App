import axios from "axios";
import todo from "../models/todo";

class TodoService {
  http = axios.create({
    baseURL: "http://localhost:8000",
  });

  async getAllTodos() {
    const response = await this.http.get<todo[]>("/todo");

    // get方法就是一个泛型函数，通过调用时，将返回类型定义好
    // 并没有使用泛型接口来定义内部的属性类型。
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

  async updateTodo(id: number, content?: string, isCompleted?: boolean) {
    const response = await this.http.patch("/todo/" + id, {
      content: content,
      isCompleted: isCompleted,
    });
    return response.data;
  }
}

export default new TodoService(); //❗此处直接传出一个实例
