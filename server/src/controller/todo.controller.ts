import type { Request, Response } from "express";
import * as TodoService from "../services/todo.service";

export async function getTodos(req: Request, res: Response) {
    try{
        const allTodos = await TodoService.getTodosService();
        res.json(allTodos);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export async function getTodo(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const todo = await TodoService.getTodoByIdService(id);
        res.json(todo);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export async function createTodo(req: Request, res: Response) {
    try {
        const { description, status } = req.body;
        const newTodo = await TodoService.createTodoService(description, status);
        res.status(201).json(newTodo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const { description, status } = req.body;
        const updateTodo = await TodoService.updateTodoService(id, description, status);
        res.json({message: "Todo was updated!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export async function deleteTodo(req: Request, res: Response) {
    try{
        const id = req.params.id as string;
        const deleteTodo = await TodoService.deleteTodoService(id);
        res.json({ message: "Todo was deleted!" });
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}