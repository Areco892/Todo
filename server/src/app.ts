import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import timerRoutes from "./routes/timer.routes";
import workoutRoutes from "./routes/workout.routes";
import exerciseRoutes from "./routes/exercise.routes";
import workoutPlanRoutes from "./routes/workout_plan.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/todos", todoRoutes);
app.use("/timers", timerRoutes);
app.use("/workouts", workoutRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/workoutplans", workoutPlanRoutes);

export default app;
