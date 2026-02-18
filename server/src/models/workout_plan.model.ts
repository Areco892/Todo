import pool from "../db";

export async function getWorkouts(){
    const workouts = await pool.query(`SELECT * FROM workout ORDER BY created_at;`);
    return workouts.rows;
}

export async function getExercises(workoutId: string) {
    const workout = await pool.query(
        `SELECT 1 FROM workout WHERE wid = $1`,
        [workoutId]
    );
    if (workout.rowCount === 0) {
        throw new Error("Workout not found!");
    }
    
    const exercises = await pool.query(
        `SELECT e.eid, e.name, we.sets, we.weight, we.reps
        FROM workout w
        JOIN workout_exercise we
        ON w.wid = we.wid
        JOIN exercise e
        ON e.eid = we.eid
        WHERE w.wid = $1
        ORDER BY e.eid;`,
        [workoutId]
    );
    if (exercises.rowCount === 0) {
        throw new Error("Exercises not found!")
    }
    
    return exercises.rows;
}

export async function createWorkout(name: string) {
    const newWorkout = await pool.query(
        `INSERT INTO workout (name, created_at) VALUES ($1, NOW()) RETURNING *`,
        [name]
    );
    
    return newWorkout.rows[0];
}

export async function updateWorkout(workoutId: string, workoutName: string) {
    const result = await pool.query(
        `UPDATE workout
        SET name = $1
        WHERE wid = $2;`,
        [workoutName, workoutId]
    );
    if (result.rowCount === 0) {
        throw new Error("Workout not found!");
    }

    return "Workout was updated!";
}

export async function deleteWorkout(workoutId: string) {
    const result = await pool.query(
        "DELETE FROM workout WHERE wid = $1",
        [workoutId]
    );
    if (result.rowCount === 0) {
        throw new Error("Workout not found!");
    }

    return "Workout was deleted!";
}

export async function deleteExercise(wid: string, eid: string) {
    const result = await pool.query(
        `DELETE FROM workout_exercise WHERE wid = $1 AND eid = $2`, 
        [wid, eid]
    );
    if (result.rowCount === 0) {
        throw new Error("Exercise was not found!");
    }

    return "Exercise was deleted!";
}