import { Router } from "express";
import { getExercises, createExercise, updateExercise, deleteExercise, addExercise } from "../controller/exercise.controller";

const router = Router();

router.get("/", getExercises);
router.post("/", createExercise);
router.post("/add", addExercise);
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);
export default router;
