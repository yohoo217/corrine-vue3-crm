//server/modules/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  date: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['已付款', '未付款', '退款中'], default: '未付款' },
});

module.exports = mongoose.model('Booking', BookingSchema);
