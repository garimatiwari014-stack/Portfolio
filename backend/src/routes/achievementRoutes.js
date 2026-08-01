import express from 'express';
import { getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement } from '../controllers/achievementController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAchievements);
router.get('/:id', getAchievement);
router.post('/', protect, adminOnly, uploadImage.single('image'), createAchievement);
router.put('/:id', protect, adminOnly, uploadImage.single('image'), updateAchievement);
router.delete('/:id', protect, adminOnly, deleteAchievement);

export default router;
