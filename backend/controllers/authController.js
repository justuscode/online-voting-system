import Voter from '../models/Voter.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mysecretkey';

// ✅ Register new voter
export const register = async (req, res) => {
  const { name, email, password, voterId } = req.body;

  try {
    // Validate voterId: must be 8–10 digits
    const idPattern = /^[0-9]{8,10}$/;
    if (!idPattern.test(voterId)) {
      return res.status(400).json({ error: 'Voter ID must be 8 to 10 digits.' });
    }

    // Check if email or voterId already exists
    const existing = await Voter.findOne({ $or: [{ email }, { voterId }] });
    if (existing) {
      return res.status(400).json({ error: 'Email or Voter ID already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const voter = new Voter({ name, email, password: hashedPassword, voterId });
    await voter.save();

    res.status(201).json({ message: 'Voter registered successfully', id: voter._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Login voter
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

// ✅ Get current voter info
export const getMe = async (req, res) => {
  try {
    const voter = await Voter.findById(req.userId).select('-password');
    if (!voter) return res.status(404).json({ error: 'User not found' });
    res.json({ email: voter.email, hasVoted: voter.hasVoted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
