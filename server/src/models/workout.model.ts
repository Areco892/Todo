import pool from "../db";

export async function getAllWorkouts() {
    const allWorkouts = await pool.query("SELECT * FROM workout");
    return allWorkouts.rows;
}

export async function createWorkout(name: string, image: string, description: string) {
    const newWorkout = await pool.query(
        "INSERT INTO workout (name, image, description) VALUES($1, $2, $3) RETURNING *",
        [name, image, description]
    );
    return newWorkout;
}

export async function updateWorkout(id: string, name: string, image: string, description: string) {
    const updateWorkout = await pool.query(
        `UPDATE workout
        SET name = $1.
            image = $2,
            description = $3
        WHERE workout_id = $4`,
        [name, image, description, id]
    );
    return "Workout was updated!";
}

export async function deleteWorkout(id: string) {
    const deleteWorkout = await pool.query(
        "DELETE FROM workout WHERE workout_id = id",
        [id]
    );
    return "Workout was deleted!";
}