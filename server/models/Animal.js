const mongoose = require('mongoose');

const specSchema = new mongoose.Schema(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const animalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['cattle', 'dairy', 'goats', 'feed', 'milk', 'services'],
      index: true
    },
    tag: { type: String, trim: true, default: '' },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: '' },   // e.g. "/uploads/xyz.jpg" — leave empty to use icon
    icon: { type: String, default: '' },    // emoji fallback shown when there's no photo yet
    specs: { type: [specSchema], default: [] },
    origin: { type: String, trim: true, default: '' }, // e.g. "Pakistan" / "Imported Line"
    available: { type: Boolean, default: true }, // doubles as "Available / Sold" for livestock
    order: { type: Number, default: 0 }, // controls display order within a category

    // Livestock catalog fields (optional — leave blank for non-animal listings like feed/services)
    tagNumber: { type: String, trim: true, default: '' }, // e.g. "A-102"
    ageLabel: { type: String, trim: true, default: '' },  // e.g. "2 years" or "4 teeth"
    weightKg: { type: Number, default: null },
    price: { type: Number, default: null } // in PKR — leave blank to show "Contact for price"
  },
  { timestamps: true }
);

module.exports = mongoose.model('Animal', animalSchema);
