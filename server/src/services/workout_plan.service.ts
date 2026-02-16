import * as WorkoutPlanModel from "../models/workout_plan.model";

export async function getWorkoutsService() {
    return await WorkoutPlanModel.getWorkouts();
}

export async function getExercisesService(workoutID: string) {
    return await WorkoutPlanModel.getExercises(workoutID);
}

export async function createWorkoutService(workoutName: string) {
    return await WorkoutPlanModel.createWorkout(workoutName);
}

export async function deleteWorkoutService(workoutId: string) {
    return await WorkoutPlanModel.deleteWorkout(workoutId);
}