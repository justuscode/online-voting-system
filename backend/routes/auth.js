import express from 'express';
import Voter from '../models/Voter.js'; // make sure path is correct

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const voter = new Voter({ name, email, password });
    await voter.save();
    res.status(201).json({ message: 'Voter registered successfully', id: voter._id });
  } catch (err) {
    console.error(err); // Add this to see error in terminal
    res.status(500).json({ error: err.message });
  }
});

export default router;
