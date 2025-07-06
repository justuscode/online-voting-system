import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js'; // ✅ required to protect /me route

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// ✅ NEW: Get current voter's profile (email + hasVoted status)
router.get('/me', verifyToken, getMe);

export default router;
