import express from 'express';
import { getProfile, createOrUpdateProfile, getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '../controllers/profileController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getProfile);
router.post('/', protect, adminOnly, uploadImage.single('profileImage'), createOrUpdateProfile);
router.put('/', protect, adminOnly, uploadImage.single('profileImage'), createOrUpdateProfile);

router.get('/social-links', getSocialLinks);
router.post('/social-links', protect, adminOnly, createSocialLink);
router.put('/social-links/:id', protect, adminOnly, updateSocialLink);
router.delete('/social-links/:id', protect, adminOnly, deleteSocialLink);

export default router;
