// server/routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // 確保您有一個對應的 Booking 模型

// 獲取所有預約
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建新預約
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

// 您可以根據需要添加更多路由

module.exports = router;
