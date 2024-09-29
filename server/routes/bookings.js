// server/routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // 確保您有一個對應的 Booking 模型

// 獲取所有預約
router.get("/", async (req, res) => {
  try {
    console.log("Received booking data:", req.body);
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bookings for a specific user by customerId
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ customerId: req.params.userId }).populate('course');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 創建新預約
// /server/routes/bookings.js

router.post("/", async (req, res) => {
  try {
    console.log("Received booking data:", req.body);
    const { course, customer, customerId } = req.body;

    const bookingData = {
      course,
      customer,
    };

    if (customerId && customerId !== "") {
      bookingData.customerId = customerId;
    }

    console.log("Creating booking with data:", bookingData);
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(400).json({ message: error.message });
  }
});

router.post('/book', async (req, res) => {
  try {
    const newBooking = new Booking({
      course: req.body.courseId,
      customerId: req.user._id, // 確保將當前使用者的 _id 存入 customerId
      customer: {
        name: req.user.username,
        email: req.user.email,
        phone: req.user.phone || 'N/A',
      },
      date: req.body.date,
    });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to book course' });
  }
});



// 您可以根據需要添加更多路由

module.exports = router;
