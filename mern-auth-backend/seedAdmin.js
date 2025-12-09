require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust path as needed
const { connectDB } = require('./config/db');

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = 'admin@eko.com';
    const password = 'admin123';
    const name = 'Admin User';

    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      passwordHash,
      roles: ['admin'], // Assuming roles field exists, based on authController signAccessToken usage
      verificationToken: 'seeded-admin'
    });

    await user.save();
    console.log(`Admin user created successfully.`);
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
};

seedAdmin();
