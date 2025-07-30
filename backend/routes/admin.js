import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Voter from '../models/Voter.js';
import { verifyToken, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// ✅ Admin login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Voter.findOne({ email, role: 'admin' });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: admin.role });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ Protected route (example)
router.get('/voters', verifyToken, adminMiddleware, async (req, res) => {
  try {
    const voters = await Voter.find().select('-password');
    res.json(voters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
