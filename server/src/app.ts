import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes";
import timerRoutes from "./routes/timer.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/todos", todoRoutes);
app.use("/timers", timerRoutes);

export default app;
