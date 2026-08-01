import express from 'express';
import { getActiveResume, getAllResumes, uploadResume, deleteResume, setActiveResume, incrementDownload } from '../controllers/resumeController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { uploadDocument } from '../middleware/upload.js';

const router = express.Router();

router.get('/active', getActiveResume);
router.get('/', protect, adminOnly, getAllResumes);
router.post('/upload', protect, adminOnly, uploadDocument.single('resume'), uploadResume);
router.delete('/:id', protect, adminOnly, deleteResume);
router.put('/:id/activate', protect, adminOnly, setActiveResume);
router.post('/:id/download', incrementDownload);

export default router;
