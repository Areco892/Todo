import * as ExerciseModel from "../models/exercise.model";

export async function getExercisesService(difficulty: string, target: string) {
    return await ExerciseModel.getExercises(difficulty, target);
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

export async function addExerciseService(wid: string, eid: string, sets: string, weight: string, reps: string) {
    return await ExerciseModel.addExercise(wid, eid, sets, weight, reps);
}