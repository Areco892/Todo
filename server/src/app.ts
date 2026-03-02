import express from "express";
import cors from "cors";
import workoutRoutes from "./routes/workout.routes";
import exerciseRoutes from "./routes/exercise.routes";
import workoutPlanRoutes from "./routes/workout_plan.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/workouts", workoutRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/workoutplans", workoutPlanRoutes);

export default app;
