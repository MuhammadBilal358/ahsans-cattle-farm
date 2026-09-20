// Adds the new Phase-1 items (buffalo/sheep breeds, dairy products, services)
// WITHOUT touching or deleting anything already in the database.
// Run this once: npm run add-more

require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
const mongoose = require('mongoose');
const Animal = require('../models/Animal');

const newItems = [
  // ---------------- Buffaloes & Sheep (added to existing categories) ----------------
  {
    category: 'dairy', order: 7, icon: '🐃', origin: 'Pakistan',
    title: 'Kundi Buffalo', tag: 'Dairy Breed',
    description: 'A hardy Sindh-region buffalo breed known for good milk fat content and calm temperament.',
    specs: [
      { label: 'Category', value: 'Dairy Buffalo' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Temperament', value: 'Calm, hardy' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'goats', order: 7, icon: '🐑', origin: 'Pakistan',
    title: 'Kajli (Sheep)', tag: 'Sheep Breed',
    description: 'A popular Punjab sheep breed valued for Qurbani, known for its size and wool.',
    specs: [
      { label: 'Category', value: 'Qurbani Sheep' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Build', value: 'Large, woolly' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },
  {
    category: 'goats', order: 8, icon: '🐑', origin: 'Pakistan',
    title: 'Lohi (Sheep)', tag: 'Sheep Breed',
    description: 'A dual-purpose Punjab sheep breed, well suited to local conditions and good meat quality.',
    specs: [
      { label: 'Category', value: 'Qurbani Sheep' },
      { label: 'Origin', value: 'Pakistan' },
      { label: 'Build', value: 'Medium-large' },
      { label: 'Availability', value: 'Contact for current stock' }
    ]
  },

  // ---------------- Dairy & Farm Products (added to existing "milk" category) ----------------
  {
    category: 'milk', order: 4, icon: '🧈',
    title: 'Desi Ghee', tag: 'Dairy Product',
    description: 'Traditional slow-cooked desi ghee, made fresh from our own cow and buffalo milk.',
    specs: [
      { label: 'Type', value: 'Ghee' },
      { label: 'Sourced', value: "Farm's own milk" },
      { label: 'Availability', value: 'On request' }
    ]
  },
  {
    category: 'milk', order: 5, icon: '🧈',
    title: 'Makhan (Butter)', tag: 'Dairy Product',
    description: 'Fresh, hand-churned white butter — no additives or preservatives.',
    specs: [
      { label: 'Type', value: 'Butter' },
      { label: 'Sourced', value: "Farm's own milk" },
      { label: 'Availability', value: 'On request' }
    ]
  },
  {
    category: 'milk', order: 6, icon: '🧀',
    title: 'Paneer', tag: 'Dairy Product',
    description: 'Fresh paneer made in small batches from pure, unadulterated milk.',
    specs: [
      { label: 'Type', value: 'Paneer' },
      { label: 'Sourced', value: "Farm's own milk" },
      { label: 'Availability', value: 'On request' }
    ]
  },
  {
    category: 'milk', order: 7, icon: '🥣',
    title: 'Dahi (Yogurt)', tag: 'Dairy Product',
    description: 'Thick, naturally set dahi made daily from fresh farm milk.',
    specs: [
      { label: 'Type', value: 'Yogurt' },
      { label: 'Sourced', value: "Farm's own milk" },
      { label: 'Availability', value: 'Daily' }
    ]
  },
  {
    category: 'milk', order: 8, icon: '🍮',
    title: 'Khoya', tag: 'Dairy Product',
    description: 'Reduced, thickened milk solids — perfect for sweets, made fresh to order.',
    specs: [
      { label: 'Type', value: 'Khoya' },
      { label: 'Sourced', value: "Farm's own milk" },
      { label: 'Availability', value: 'On request' }
    ]
  },

  // ---------------- Services (new category) ----------------
  {
    category: 'services', order: 1, icon: '🐮',
    title: 'Animal Fattening Service (Palai)', tag: 'Service',
    description: "Bring us your own animal and we'll raise and fatten it on our farm until Qurbani, with full feed and health care.",
    specs: [
      { label: 'Best for', value: 'Qurbani preparation' },
      { label: 'Includes', value: 'Feed, housing, health checkups' },
      { label: 'Availability', value: 'Contact to discuss terms' }
    ]
  },
  {
    category: 'services', order: 2, icon: '🧬',
    title: 'Breeding & Insemination', tag: 'Service',
    description: 'Breeding services to help improve the quality and milk yield of your own herd.',
    specs: [
      { label: 'Best for', value: 'Dairy farmers' },
      { label: 'Availability', value: 'Contact to discuss terms' }
    ]
  },
  {
    category: 'services', order: 3, icon: '📋',
    title: 'Farm Consultancy', tag: 'Service',
    description: 'Advice and guidance for new farmers — feeding schedules, housing, and general livestock management.',
    specs: [
      { label: 'Best for', value: 'New & small farmers' },
      { label: 'Availability', value: 'By appointment' }
    ]
  },
  {
    category: 'services', order: 4, icon: '🚚',
    title: 'Delivery & Logistics', tag: 'Service',
    description: 'Safe, careful transport of your purchased animal to your home or city.',
    specs: [
      { label: 'Best for', value: 'Out-of-town buyers' },
      { label: 'Availability', value: 'Contact for coverage area & cost' }
    ]
  }
];

async function run() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set in .env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to', mongoose.connection.name);

  let added = 0;
  for (const item of newItems) {
    const exists = await Animal.findOne({ title: item.title, category: item.category });
    if (exists) {
      console.log(`Already exists, skipping: ${item.title}`);
      continue;
    }
    await Animal.create(item);
    added++;
    console.log(`Added: ${item.title}`);
  }

  console.log(`Done. Added ${added} new item(s).`);
  await mongoose.disconnect();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
  });
}

module.exports = newItems;
