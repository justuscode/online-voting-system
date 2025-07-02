import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Voter', voterSchema);
