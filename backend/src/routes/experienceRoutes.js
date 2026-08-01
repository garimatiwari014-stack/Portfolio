import express from 'express';
import { getExperiences, getExperience, createExperience, updateExperience, deleteExperience } from '../controllers/experienceController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getExperiences);
router.get('/:id', getExperience);
router.post('/', protect, adminOnly, uploadImage.single('logo'), createExperience);
router.put('/:id', protect, adminOnly, uploadImage.single('logo'), updateExperience);
router.delete('/:id', protect, adminOnly, deleteExperience);

export default router;
