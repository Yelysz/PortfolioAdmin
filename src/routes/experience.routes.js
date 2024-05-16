import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import {getExperiences, getExperience, createExperience, updateExperience, deleteExperience} from '../controllers/experience.controller.js'

const router =Router();

router.get('/experiences', authRequired, getExperiences)
router.get('/experiences/:id', authRequired, getExperience)
router.post('/experiences', authRequired, createExperience)
router.delete('/experiences/:id', authRequired, deleteExperience)
router.put('/experiences/:id', authRequired, updateExperience)

export default router;