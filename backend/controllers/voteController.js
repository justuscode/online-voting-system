import { db } from '../config/db.js';

export const vote = (req, res) => {
  const { user_id, candidate_id } = req.body;
  db.query('INSERT INTO votes (user_id, candidate_id) VALUES (?, ?)', [user_id, candidate_id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Vote cast successfully' });
  });
};

export const getResults = (req, res) => {
  db.query('SELECT candidate_id, COUNT(*) as votes FROM votes GROUP BY candidate_id', (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
};
