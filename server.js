import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

connectDB();
app.listen(5000, '0.0.0.0', () => {
  console.log("🚀 Server running on port 5000 (bound to 0.0.0.0)");
});

