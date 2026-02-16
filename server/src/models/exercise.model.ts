import pool from "../db";

export async function getExercises(difficulty: string, target: string) {
    let exercises;
    if (target == "All" && difficulty == "All") {
        exercises = await pool.query("SELECT * FROM exercise;");
    }
    else if (target == "All") {
        exercises = await pool.query(
            "SELECT * FROM exercise WHERE difficulty = $1;",
            [difficulty]
        );
    } 
    else if (difficulty == "All") {
        exercises = await pool.query(
            "SELECT * FROM exercise WHERE target = $1;",
            [target]
        );
    }
    else {
        exercises = await pool.query(
            "SELECT * FROM exercise WHERE target = $1 AND difficulty = $2;",
            [target, difficulty]
        );
    }
    return exercises.rows;
}   

export async function createExercise(name: string, image: string, target: string, difficulty: string) {
    const newExercise = await pool.query(
        "INSERT INTO exercise (name, image, target, difficulty) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, image, target, difficulty]
    );
    return newExercise;
}

export async function updateExercise(id: string, name: string, image: string, target: string, difficulty: string) { 
    const updatedExercise = await pool.query(
        `UPDATE exercise 
        SET name = $1,
            image = $2,
            target = $3,
            difficulty = $4
        WHERE eid = $5`,
        [name, image, target, difficulty, id]
    );
}

export async function deleteExercise(id: string) {
    const deleteExercise = await pool.query(
        "DELETE FROM exercise WHERE eid = $1;", 
        [id]
    );
    return "Exercise was deleted!";
}

export async function addExercise(wid: string, eid: string, sets: string, weight: string, reps: string) {
    const exercise = await pool.query(
        `INSERT INTO workout_exercise (wid, eid, sets, weight, reps)
        VALUES ($1, $2, $3, $4, $5)`, 
        [wid, eid, sets, weight, reps]
    );
    return exercise.rows[0];
}