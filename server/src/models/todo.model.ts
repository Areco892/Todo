import pool from "../db";

export async function getAllTodos() {
    const allTodos = await pool.query("SELECT * FROM todo");
    return allTodos.rows;
}

export async function getTodoById(id: string){
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);        
    return todo.rows[0];
}

export async function createTodo(description: string, status: string) {
    const newTodo = await pool.query(
        "INSERT INTO todo (description, status) VALUES($1, $2) RETURNING *",
        [description, status]
    );
    return newTodo;
}

export async function updateTodo(id: string, description: string, status: string) {
    const updateTodo = await pool.query(
        `UPDATE todo
        SET description = $1,
            status = $2
        WHERE todo_id = $3`, 
        [description, status, id]
    );
    return "Todo was updated!";
} 

export async function deleteTodo(id: string) {
    const deleteTodo = await pool.query(
        "DELETE FROM todo WHERE todo_id = $1", 
        [id]
    );
    return "Todo was deleted!";
} 