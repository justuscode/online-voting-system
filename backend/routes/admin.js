import express from 'express';
import Voter from '../models/Voter.js';
import { verifyToken, adminMiddleware } from '../middleware/auth.js'; // ✅ Fix here

const router = express.Router();

// ✅ Get all registered voters (Admin only)
router.get('/voters', verifyToken, adminMiddleware, async (req, res) => {
  try {
    const voters = await Voter.find().select('-password');
    res.json(voters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
