import * as TodoModel from "../models/todo.model";

export async function getTodosService() {
    return await TodoModel.getAllTodos();
}

export async function getTodoByIdService(id: string) {
    return await TodoModel.getTodoById(id);
}

export async function createTodoService(description: string, status: string) {
    if (!description) {
        throw new Error("Description is required!");
    }
    return await TodoModel.createTodo(description, status);
}

export async function updateTodoService(id: string, description: string, status: string) {
    return await TodoModel.updateTodo(id, description, status);
}

export async function deleteTodoService(id: string) {
    return await TodoModel.deleteTodo(id);
}