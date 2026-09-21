const express = require('express');
const Animal = require('../models/Animal');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

const VALID_CATEGORIES = ['cattle', 'dairy', 'goats', 'feed', 'milk', 'services'];

// Only these fields can be set from the Admin Dashboard
const EDITABLE_FIELDS = [
  'title', 'category', 'tag', 'description', 'image', 'icon', 'specs', 'origin',
  'available', 'order', 'tagNumber', 'ageLabel', 'weightKg', 'price'
];
function pickEditable(body) {
  const out = {};
  for (const key of EDITABLE_FIELDS) if (body[key] !== undefined) out[key] = body[key];
  return out;
}

// Turn Mongoose errors into friendly 400 responses instead of generic 500s
function sendDbError(res, err, fallback) {
  if (err.name === 'ValidationError') {
    const msg = Object.values(err.errors).map((e) => e.message).join(' ');
    return res.status(400).json({ message: msg || 'Some fields are invalid.' });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Invalid value for "${err.path}".` });
  }
  return res.status(500).json({ message: fallback });
}

// GET /api/animals?category=goats  (category optional — omit to get everything)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = {};
    if (category) {
      if (!VALID_CATEGORIES.includes(category)) {
        return res.status(400).json({ message: `Unknown category "${category}".` });
      }
      filter.category = category;
    }
    const animals = await Animal.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(animals);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching animals.' });
  }
});

// GET /api/animals/:id
router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Not found.' });
    res.json(animal);
  } catch (err) {
    res.status(400).json({ message: 'Invalid id.' });
  }
});

// POST /api/animals — admin only
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description) {
      return res.status(400).json({ message: 'title, category and description are required.' });
    }
    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: `Unknown category "${category}".` });
    }
    const animal = await Animal.create(pickEditable(req.body));
    res.status(201).json(animal);
  } catch (err) {
    sendDbError(res, err, 'Server error while creating the listing.');
  }
});

// PUT /api/animals/:id — admin only
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    if (req.body.category && !VALID_CATEGORIES.includes(req.body.category)) {
      return res.status(400).json({ message: `Unknown category "${req.body.category}".` });
    }
    const animal = await Animal.findByIdAndUpdate(req.params.id, pickEditable(req.body), {
      new: true,
      runValidators: true
    });
    if (!animal) return res.status(404).json({ message: 'Not found.' });
    res.json(animal);
  } catch (err) {
    sendDbError(res, err, 'Server error while updating the listing.');
  }
});

// DELETE /api/animals/:id — admin only
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) return res.status(404).json({ message: 'Not found.' });
    res.json({ message: 'Deleted.' });
  } catch (err) {
    sendDbError(res, err, 'Server error while deleting the listing.');
  }
});

module.exports = router;
