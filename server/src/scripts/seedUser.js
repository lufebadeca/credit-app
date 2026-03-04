import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../models/User.js';

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  const exists = await User.findOne({ email: 'admin@fyasocialcapital.com' });
  if (!exists) {
    await User.create({
      email: 'admin@fyasocialcapital.com',
      password: 'Admin123!'
    });
    console.log('Usuario admin creado: admin@fyasocialcapital.com / Admin123!');
  } else {
    console.log('Usuario admin ya existe');
  }
  await mongoose.disconnect();
}

seed().catch(console.error);
