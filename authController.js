import { db } from '../config/db.js';

export const registerUser = (req, res) => {
  const { username, password } = req.body;
  db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'User registered' });
  });
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) res.json({ message: 'Login successful' });
    else res.status(401).json({ message: 'Invalid credentials' });
  });
};
