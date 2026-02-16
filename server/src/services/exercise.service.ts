import * as ExerciseModel from "../models/exercise.model";

export async function getExercisesService() {
    return await ExerciseModel.getExercises();
}

export async function createExerciseService(name: string, image: string, target: string, difficulty: string) {
    return await ExerciseModel.createExercise(name, image, target, difficulty);
}

export async function updateExerciseService(id: string, name: string, image: string, target: string, difficulty: string) {
    return await ExerciseModel.updateExercise(id, name, image, target, difficulty);
}

export async function deleteExerciseService(id: string) {
    return await ExerciseModel.deleteExercise(id);
}