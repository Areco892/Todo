import { Router } from "express";
import { getWorkouts, createWorkout, updateWorkout, deleteWorkout } from "../controller/workout.controller";

const router = Router();

router.get("/", getWorkouts);
router.post("/", createWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;