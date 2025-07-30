import mongoose from 'mongoose';

const voterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  voterId: {
    type: String,
    required: true,
    unique: true,
    match: /^[0-9]{8,10}$/
  },
  hasVoted: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['voter', 'admin'],
    default: 'voter'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Voter', voterSchema);
