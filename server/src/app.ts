const express = require("express");
import type { Request, Response } from 'express';
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Get all todos
app.get('/todos', async(req: Request, res: Response) => {
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows);
    } catch(err) {
        console.error(err);
    }
});

// Get a todo
app.get('/todos/:id', async(req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        
        res.json(todo.rows[0]);
    } catch(err) {
        console.error(err);
    }
});

// Create a todo
app.post("/todos", async(req: Request, res: Response) => {
    try {
        const { description, status } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description, status) VALUES($1, $2) RETURNING *",
            [description, status]
        );
        res.json(newTodo);
    } catch (error) {
        console.error(error);
    }
});

// Update a todo
app.put("/todos/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { description, status } = req.body;
        const updateTodo = await pool.query(
            `UPDATE todo
            SET description = $1,
                status = $2
            WHERE todo_id = $3`, 
            [description, status, id]
        );
        res.json("Todo was updated!")
    } catch (err) {
        console.error(err);
    }
});

// Delete a todo
app.delete('/todos/:id', async(req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1", 
            [id]
        );
        res.json("Todo was deleted!");
    } catch(err) {
        console.error(err);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000")
})
