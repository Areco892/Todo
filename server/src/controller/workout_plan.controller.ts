import type { Request, Response } from "express";
import * as WorkoutPlanServices from "../services/workout_plan.service";

export async function getWorkouts(req: Request, res: Response) {
    try {
        const workouts = await WorkoutPlanServices.getWorkoutsService();
        res.json(workouts);
    } catch (error) {
        console.error(error);
        res.send(500).json({ message: "Server error." });
    }
}

export async function getExercises(req: Request, res: Response) {
    try {
        const workoutId = req.params.id as string;
        const exercises = await WorkoutPlanServices.getExercisesService(workoutId);
        res.json(exercises);
    } catch (error) {
        console.error(error);
        res.send(500).json({ message: "Server error." });
    }
}

export async function createWorkout(req: Request, res: Response) {
    try {
        const { name } = req.body;
        const newWorkout = await WorkoutPlanServices.createWorkoutService(name);
        res.json(newWorkout);
    } catch (error) {
        console.error(error);
        res.send(500).json({ message: "Server error." });
    }
}

export async function updateWorkout(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const { name } = req.body;
        const updatedWorkout = await WorkoutPlanServices.updateWorkoutService(id, name);
        res.json(updatedWorkout);
    } catch (error) {
        console.error(error);
        res.send(500).json({ message: "Server error." });
    }
}

export async function deleteWorkout(req: Request, res: Response) {
    try {
        const workoutId = req.params.id as string;
        const deletedWorkout = await WorkoutPlanServices.deleteWorkoutService(workoutId);
        res.json({ message: "Workout was deleted!" });
    } catch (error) {
        console.error(error);
        res.send(500).json({ message: "Server error." });
    }
}

export async function deleteExercise(req: Request, res: Response) {
    try {
        const { wid, eid } = req.params;
        await WorkoutPlanServices.deleteExerciseService(wid as string, eid as string);
        res.json({ message: "Exercise was deleted!" });
    } catch (error) {
        console.error(error);
        res.send(500).json({ message: "Server error." });
    }
}