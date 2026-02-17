import { Router } from "express";
import { getExercises } from "../controller/workout.controller";

const router = Router();

router.get("/:wid", getExercises);

export default router;