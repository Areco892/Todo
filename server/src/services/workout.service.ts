import * as WorkoutModel from "../models/workout.model";

export async function getWorkoutsService() {
    return await WorkoutModel.getAllWorkouts();
}

export async function createWorkoutService(name: string, image: string, description: string) {
    if (!description) {
        throw new Error("Description is required!");
    }
    return await WorkoutModel.createWorkout(name, image, description);
}

export async function updateWorkoutService(id: string, name: string, image: string, description: string) {
    return await WorkoutModel.updateWorkout(id, name, image, description);
}

export async function deleteWorkoutService(id: string) {
    return await WorkoutModel.deleteWorkout(id);
}