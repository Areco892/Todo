import { Router } from "express";
import { getTimers, createTimer, deleteTimer } from "../controller/timer.controller";

const router = Router();

router.get("/", getTimers);
router.post("/", createTimer);
router.delete("/:id", deleteTimer);

export default router;