import { Router } from "express";
import { getExercises, createExercise, updateExercise, deleteExercise } from "../controller/exercise.controller";

const router = Router();

router.get("/", getExercises);
router.post("/", createExercise);
router.put("/:id", updateExercise)
router.delete("/:id", deleteExercise);
export default router;
