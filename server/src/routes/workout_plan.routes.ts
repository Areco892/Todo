import Router from "express";
import { getWorkouts, getExercises, createWorkout, deleteWorkout } from "../controller/workout_plan.controller";

const router = Router();

router.get("/", getWorkouts);
router.get("/:id", getExercises);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);

export default router;