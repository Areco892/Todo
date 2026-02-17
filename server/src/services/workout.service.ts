import * as WorkoutModel from "../models/workout.model";

export async function getExercisesService(workoutID: string) {
    return await WorkoutModel.getExercises(workoutID);
}
