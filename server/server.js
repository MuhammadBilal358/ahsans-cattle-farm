require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const animalRoutes = require('./routes/animalRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');

// Fail fast with a clear message if required settings are missing
const REQUIRED_ENV = ['MONGO_URI', 'JWT_SECRET'];
const missing = REQUIRED_ENV.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`Missing required setting(s) in server/.env: ${missing.join(', ')}. See .env.example.`);
  process.exit(1);
}
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.warn('Warning: CLOUDINARY_* settings are not set — photo uploads from the Admin Dashboard will fail.');
}

const app = express();

// Needed on Render/Railway etc. so req.ip is the real visitor IP (used by the rate limiter)
app.set('trust proxy', 1);

// CORS: set CLIENT_URL in .env (comma-separated) to only allow your own site(s).
// If it's not set, any origin is allowed (handy for local development).
const allowedOrigins = (process.env.CLIENT_URL || '')
  .split(',')
  .map((s) => s.trim().replace(/\/$/, ''))
  .filter(Boolean);
app.use(cors(allowedOrigins.length ? { origin: allowedOrigins } : {}));
app.use(express.json());

// Serve old locally-uploaded images at /uploads/<filename>
// (new uploads go to Cloudinary — see routes/uploadRoutes.js)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Unknown API route → JSON 404 instead of Express's HTML page
app.use('/api', (req, res) => res.status(404).json({ message: 'API route not found.' }));

// Friendly error handler (also catches multer errors like "file too large")
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'MulterError') {
    const message = err.code === 'LIMIT_FILE_SIZE' ? 'Photo is too large — maximum size is 5 MB.' : err.message;
    return res.status(400).json({ message });
  }
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON in request body.' });
  }
  const status = err.status || err.http_code || 500;
  res.status(status).json({ message: err.message || 'Something went wrong on the server.' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
});
