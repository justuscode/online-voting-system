import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Voter from '../models/Voter.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const existing = await Voter.findOne({ email: 'collo254@gmail.com' });
  if (existing) {
    console.log('Admin already exists');
    return process.exit();
  }

  const hashedPassword = await bcrypt.hash('123456789', 10);

  const admin = new Voter({
    name: 'Admin',
    email: 'collo254@gmail.com',
    password: hashedPassword,
    voterId: '12345678', // ✅ This line fixes your error
    role: 'admin'
  });

  await admin.save();
  console.log('✅ Admin seeded successfully');
  process.exit();
}).catch(err => {
  console.error(err);
  process.exit(1);
});
