import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Voter from '../models/Voter.js';
import { getMe } from '../controllers/authController.js'; // ✅ import
import { verifyToken } from '../middleware/auth.js'; // ✅ import

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'mysecretkey';

const manualAdmin = {
  email: 'collo254@gmail.com',
  password: '123456789',
  role: 'admin',
  name: 'Admin Collo',
  _id: 'admin-id'
};

// ✅ LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === manualAdmin.email && password === manualAdmin.password) {
      const token = jwt.sign({ id: manualAdmin._id, role: 'admin' }, SECRET, { expiresIn: '1h' });
      return res.json({ token, user: manualAdmin });
    }

    const voter = await Voter.findOne({ email });
    if (!voter) return res.status(404).json({ error: 'Voter not found' });

    const isMatch = await bcrypt.compare(password, voter.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: voter._id, role: voter.role }, SECRET, { expiresIn: '1h' });

    res.json({
      token,
      user: {
        _id: voter._id,
        name: voter.name,
        email: voter.email,
        role: voter.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// ✅ GET current logged-in user
router.get('/me', verifyToken, getMe); // ✅ Now /api/auth/me will work

export default router;
