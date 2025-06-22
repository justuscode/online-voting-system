import express from 'express';
import cors from 'cors';
import { db } from './config/db.js';
import authRoutes from './routes/auth.js';
import voteRoutes from './routes/vote.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/vote', voteRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
  db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL DB");
  });
});
