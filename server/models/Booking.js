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
  paymentStatus: { type: String, enum: ['pending', 'paid', 'unpaid', 'refunding'], default: 'unpaid' },
});

module.exports = mongoose.model('Booking', BookingSchema);
