import express from 'express';
import { getCandidates, castVote, getResults } from '../controllers/voteController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/candidates', verifyToken, getCandidates);
router.post('/cast', verifyToken, castVote);
router.get('/results', getResults);

// ✅ Admin-only route to add candidates
// ✅ Don’t use verifyToken here
router.post('/admin/add-candidate', async (req, res) => {
  const { name, party } = req.body;
  try {
    const Candidate = (await import('../models/Candidate.js')).default;
    const newCandidate = new Candidate({ name, party });
    await newCandidate.save();
    res.status(201).json(newCandidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
