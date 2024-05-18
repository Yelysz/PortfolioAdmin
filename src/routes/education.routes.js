import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import {getEducations, getEducation, createEducation, updateEducation, deleteEducation} from '../controllers/education.controller.js'
import { validateSchema } from "../middlewares/validate.middleware.js";
import { educationSchema } from "../schemas/education.schema.js";

const router =Router();

router.get('/educations', authRequired, getEducations)
router.get('/educations/:id', authRequired, getEducation)
router.post('/educations', authRequired, validateSchema(educationSchema), createEducation)
router.delete('/educations/:id', authRequired, deleteEducation)
router.put('/educations/:id', authRequired,  validateSchema(educationSchema),  updateEducation)


export default router;