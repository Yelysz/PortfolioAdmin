import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";

const router = Router();

router.get("/projects", authRequired, getProjects);
router.get("/projects/:id", authRequired, getProject);
router.post("/projects", authRequired, createProject);
router.delete("/projects/:id", authRequired, deleteProject);
router.put("/projects/:id", authRequired, updateProject);

export default router;
