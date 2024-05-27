import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import projectRoutes from "./routes/project.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import educationRoutes from "./routes/education.routes.js";
import skillRoutes from "./routes/skill.routes.js";


const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
})
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", experienceRoutes);
app.use("/api", educationRoutes);
app.use("/api", skillRoutes);

export default app;
