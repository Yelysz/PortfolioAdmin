import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getSkills,
  getSkill,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller.js";
import fileUpload from "express-fileupload";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { skillSchema } from "../schemas/skill.schema.js";

const router = Router();

router.get("/skills", authRequired, getSkills);
router.get("/skills/:id", authRequired, getSkill);
router.post(
  "/skills",
  authRequired,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  validateSchema(skillSchema),
  createSkill
);
router.delete("/skills/:id", authRequired, deleteSkill);
router.put(
  "/skills/:id",
  authRequired,
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  }),
  validateSchema(skillSchema),
  updateSkill
);

export default router;
