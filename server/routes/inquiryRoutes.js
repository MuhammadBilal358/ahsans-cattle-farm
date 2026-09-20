const express = require('express');
const Inquiry = require('../models/Inquiry');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// POST /api/inquiries — public, anyone can submit the contact form
router.post('/', async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ message: 'Name, phone and message are all required.' });
    }
    const inquiry = await Inquiry.create({ name, phone, message });
    res.status(201).json({ message: 'Thank you — we will get back to you soon.', inquiry });
  } catch (err) {
    res.status(500).json({ message: 'Could not send your message right now. Please try calling or WhatsApp instead.' });
  }
});

// GET /api/inquiries — admin only, newest first
router.get('/', requireAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching inquiries.' });
  }
});

// PUT /api/inquiries/:id — admin only, toggle handled status
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inquiry) return res.status(404).json({ message: 'Not found.' });
    res.json(inquiry);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating.' });
  }
});

// DELETE /api/inquiries/:id — admin only
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
    if (!inquiry) return res.status(404).json({ message: 'Not found.' });
    res.json({ message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting.' });
  }
});

module.exports = router;