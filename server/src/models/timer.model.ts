import pool from "../db";

export async function getAllTimers() {
    const allTimers = await pool.query("SELECT * FROM timer");
    return allTimers.rows;
}

export async function createTimer(name: string, time: string) {
    const newTimer = await pool.query(
        "INSERT INTO timer (name, time) VALUES($1, $2) RETURNING *",
        [name, time]
    );
    return newTimer;
}

export async function deleteTimer(id: string) {
    const deleteTimer = await pool.query(
        "DELETE FROM timer WHERE timer_id = $1", 
        [id]
    );
    return "Timer was deleted!";
} 