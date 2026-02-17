import type { Request, Response } from "express";
import * as WorkoutService from "../services/workout.service";

export async function getExercises(req: Request, res: Response) {
    try {
        const wid = req.params.wid as string;
        const exercises = await WorkoutService.getExercisesService(wid);
        res.json(exercises);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}