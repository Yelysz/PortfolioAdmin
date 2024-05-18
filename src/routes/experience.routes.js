import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import {getExperiences, getExperience, createExperience, updateExperience, deleteExperience} from '../controllers/experience.controller.js'
import { validateSchema } from "../middlewares/validate.middleware.js";
import { experienceSchema } from "../schemas/experience.schema.js";

const router =Router();

router.get('/experiences', authRequired, getExperiences)
router.get('/experiences/:id', authRequired, getExperience)
router.post('/experiences', authRequired, validateSchema(experienceSchema), createExperience)
router.delete('/experiences/:id', authRequired, deleteExperience)
router.put('/experiences/:id', authRequired, validateSchema(experienceSchema),  updateExperience)

export default router;