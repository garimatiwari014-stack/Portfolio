import express from 'express';
import { login, refresh, logout, getMe, updatePassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { loginValidation, validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authLimiter, loginValidation, validate, login);
router.post('/refresh', refresh);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

export default router;
