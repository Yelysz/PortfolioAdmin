import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getProjects,
  getProject,
  createProject,
  deleteProject,
  updateProject,
} from "../controllers/project.controller.js";
import fileUpload from "express-fileupload";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { projectSchema } from "../schemas/project.schema.js";

const router = Router();

router.get("/projects", authRequired, getProjects);
router.get("/projects/:id", authRequired, getProject);
router.post(
  "/projects",
  authRequired,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  validateSchema(projectSchema),
  createProject
);
router.delete("/projects/:id", authRequired, deleteProject);
router.put(
  "/projects/:id",
  authRequired,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  validateSchema(projectSchema),
  updateProject
);

export default router;
