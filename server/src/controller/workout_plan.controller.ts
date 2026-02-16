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