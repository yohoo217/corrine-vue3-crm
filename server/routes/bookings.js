// server/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');  // 確保您有一個對應的 Booking 模型

// 獲取所有預約
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建新預約
router.post('/', async (req, res) => {
  const booking = new Booking(req.body);
  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 您可以根據需要添加更多路由

module.exports = router;