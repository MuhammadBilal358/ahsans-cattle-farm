const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const { requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Images are uploaded straight to Cloudinary (free cloud storage) instead of
// the server's local disk, so they survive redeploys/restarts on free hosting.
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'ahsans-cattle-farm',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// POST /api/upload — admin only. Field name: "image"
router.post('/', requireAdmin, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No image uploaded.' });
  // req.file.path is the full Cloudinary URL for the uploaded image
  res.json({ path: req.file.path });
});

module.exports = router;