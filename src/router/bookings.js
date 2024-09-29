// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get bookings for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookings = await Booking.find({ customerId: userId }).populate('course');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', async (req, res) => {
  console.log("Received booking data:", req.body);
  const booking = new Booking(req.body);
  try {
    const newBooking = await booking.save();
    console.log("New booking created:", newBooking);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Booking creation error:", err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation Error', details: err.errors });
    }
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// Add more route handlers as needed

module.exports = router;