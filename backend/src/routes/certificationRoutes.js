import express from 'express';
import { getCertifications, getCertification, createCertification, updateCertification, deleteCertification } from '../controllers/certificationController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getCertifications);
router.get('/:id', getCertification);
router.post('/', protect, adminOnly, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]), createCertification);
router.put('/:id', protect, adminOnly, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]), updateCertification);
router.delete('/:id', protect, adminOnly, deleteCertification);

export default router;
