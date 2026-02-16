import pool from "../db";

export async function getWorkouts(){
    const workouts = await pool.query(`SELECT * FROM workout ORDER BY wid;`);
    return workouts.rows;
}

export async function getExercises(workoutId: string) {
    const exercises = await pool.query(
        `SELECT e.name, we.sets, we.weight, we.reps
        FROM workout w
        JOIN workout_exercise we
        ON w.wid = we.wid
        JOIN exercise e
        ON e.eid = we.eid
        WHERE w.wid = $1
        ORDER BY e.eid;`,
        [workoutId]
    );
    return exercises.rows;
}

export async function createWorkout(name: string) {
    const newWorkout = await pool.query(
        `INSERT INTO workout (name) VALUES ($1) RETURNING *`,
        [name]
    );
    return newWorkout.rows[0];
}

export async function deleteWorkout(workoutId: string) {
    const response = await pool.query(
        "DELETE FROM workout WHERE wid = $1 ",
        [workoutId]
    );
    return "Workout was deleted!";
}