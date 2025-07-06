import Voter from '../models/Voter.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

// Register new voter
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const voter = new Voter({ name, email, password: hashedPassword });
    await voter.save();
    res.status(201).json({ message: 'Voter registered successfully', id: voter._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login voter
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const voter = await Voter.findOne({ email });
    if (!voter) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, voter.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: voter._id }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ NEW: Return current voter's info (used to check if they have voted)
export const getMe = async (req, res) => {
  try {
    const voter = await Voter.findById(req.userId).select('-password');
    if (!voter) return res.status(404).json({ error: 'User not found' });
    res.json({ email: voter.email, hasVoted: voter.hasVoted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
