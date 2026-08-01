import express from 'express';
import { getProjects, getProject, createProject, updateProject, deleteProject, getCategories } from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadImage } from '../middleware/upload.js';
import { projectValidation, validate } from '../middleware/validate.js';

const router = express.Router();

router.get('/', getProjects);
router.get('/categories', getCategories);
router.get('/:id', getProject);
router.post('/', protect, adminOnly, uploadImage.single('image'), projectValidation, validate, createProject);
router.put('/:id', protect, adminOnly, uploadImage.single('image'), updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

export default router;
