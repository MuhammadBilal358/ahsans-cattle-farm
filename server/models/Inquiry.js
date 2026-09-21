const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, required: true, trim: true, maxlength: 30 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    handled: { type: Boolean, default: false } // admin can mark as followed-up
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', inquirySchema);