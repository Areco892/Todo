import type { Request, Response } from "express";
import * as WorkoutService from "../services/workout.service";

export async function getWorkouts(req: Request, res: Response) {
    try {
        const allWorkouts = await WorkoutService.getWorkoutsService();
        res.json(allWorkouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function createWorkout(req: Request, res: Response) {
    try {
        const { name, image, description } = req.body;
        const newWorkout = await WorkoutService.createWorkoutService(name, image, description);
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function updateWorkout(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const { name, image, description } = req.body 
        const updateWorkout = await WorkoutService.updateWorkoutService(id, name, image, description);
        res.json({ message: "Workout was updated!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export async function deleteWorkout(req: Request, res: Response) {
    try {
        const id = req.params.id as string;
        const deleteWorkout = await WorkoutService.deleteWorkoutService(id);
        res.json({ message: "Workout was deleted!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}