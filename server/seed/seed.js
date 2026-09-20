require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Animal = require('../models/Animal');
const Admin = require('../models/Admin');
const seedData = require('./seedData');

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set. Copy .env.example to .env and fill it in first.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to', mongoose.connection.name);

  // ---- Animals ----
  // Checks each item individually (by title + category) instead of an
  // all-or-nothing count, so missing items get added back without
  // duplicating anything that's already there.
  let added = 0;
  for (const item of seedData) {
    const exists = await Animal.findOne({ title: item.title, category: item.category });
    if (!exists) {
      await Animal.create(item);
      added++;
      console.log(`Added: ${item.title}`);
    }
  }
  console.log(`Animal seed check complete. Added ${added} missing item(s).`);

  // ---- Admin account ----
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'change-this-password';

  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    console.log(`Admin "${username}" already exists — leaving it as is.`);
  } else {
    const passwordHash = await bcrypt.hash(password, 10);
    await Admin.create({ username, passwordHash });
    console.log(`Created admin account "${username}". You can log in with the password from your .env file.`);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});