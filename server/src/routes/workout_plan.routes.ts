import Router from "express";
import { getWorkouts, getExercises, createWorkout, updateWorkout, deleteWorkout, deleteExercise } from "../controller/workout_plan.controller";

const router = Router();

router.get("/", getWorkouts);
router.get("/:id", getExercises);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);
router.delete("/:wid/:eid", deleteExercise);

export default router;