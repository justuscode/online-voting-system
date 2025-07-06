import Candidate from '../models/Candidate.js';
import Voter from '../models/Voter.js';

export const getCandidates = async (req, res) => {
  const candidates = await Candidate.find();
  res.json(candidates);
};

export const castVote = async (req, res) => {
  const { userId } = req; // comes from JWT middleware
  const { candidateId } = req.body;

  const voter = await Voter.findById(userId);
  if (!voter || voter.hasVoted) {
    return res.status(400).json({ error: 'You have already voted or not authorized' });
  }

  const candidate = await Candidate.findById(candidateId);
  if (!candidate) return res.status(404).json({ error: 'Candidate not found' });

  candidate.votes += 1;
  await candidate.save();

  voter.hasVoted = true;
  await voter.save();

  res.json({ message: 'Vote cast successfully' });
};

export const getResults = async (req, res) => {
  const candidates = await Candidate.find().sort({ votes: -1 });
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const results = candidates.map(c => ({
    name: c.name,
    party: c.party,
    votes: c.votes,
    percent: totalVotes === 0 ? 0 : ((c.votes / totalVotes) * 100).toFixed(2)
  }));

  const winner = candidates[0];

  res.json({ totalVotes, results, winner });
};
