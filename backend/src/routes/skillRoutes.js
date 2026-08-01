import express from 'express';
import { getSkills, getSkill, createSkill, updateSkill, deleteSkill, getCategories } from '../controllers/skillController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';
import { skillValidation, validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getSkills);
router.get('/categories', getCategories);
router.get('/:id', getSkill);
router.post('/', protect, adminOnly, uploadImage.single('logo'), skillValidation, validate, createSkill);
router.put('/:id', protect, adminOnly, uploadImage.single('logo'), updateSkill);
router.delete('/:id', protect, adminOnly, deleteSkill);

export default router;
