import { Router } from "express";
import {authRequired} from '../middlewares/validateToken.js'
import {getSkills, getSkill, createSkill, updateSkill, deleteSkill} from '../controllers/skill.controller.js'


const router =Router();

router.get('/skills', authRequired, getSkills)
router.get('/skills/:id', authRequired, getSkill)
router.post('/skills', authRequired, createSkill)
router.delete('/skills/:id', authRequired, deleteSkill)
router.put('/skills/:id', authRequired, updateSkill)

export default router;