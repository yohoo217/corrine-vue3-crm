//server/modules/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // 将 required 设置为 false
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);