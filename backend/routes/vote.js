// FILE: backend/routes/vote.js

import express from 'express';
import { getResults, getCandidates, castVote } from '../controllers/voteController.js';

const router = express.Router();

// Public admin route
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

router.get('/candidates', getCandidates);
router.post('/cast', castVote);
router.get('/results', getResults);

export default router;
