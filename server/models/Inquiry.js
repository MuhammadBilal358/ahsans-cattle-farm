const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    handled: { type: Boolean, default: false } // admin can mark as followed-up
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);