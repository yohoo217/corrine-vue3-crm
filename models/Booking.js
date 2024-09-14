// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false }, // 设置为可选
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);