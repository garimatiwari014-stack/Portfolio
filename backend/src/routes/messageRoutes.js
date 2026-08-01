import express from 'express';
import { getMessages, getMessage, createMessage, updateMessage, deleteMessage, getStats } from '../controllers/messageController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import { contactValidation, validate } from '../middleware/validate.js';
import { contactLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/', protect, adminOnly, getMessages);
router.get('/stats', protect, adminOnly, getStats);
router.get('/:id', protect, adminOnly, getMessage);
router.post('/', contactLimiter, contactValidation, validate, createMessage);
router.put('/:id', protect, adminOnly, updateMessage);
router.delete('/:id', protect, adminOnly, deleteMessage);

export default router;
