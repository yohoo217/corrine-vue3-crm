// server/routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // Booking 模型

// 根據 email 獲取所有預約
router.get('/user/email/:email', async (req, res) => {
  console.log('Fetching bookings for email:', req.params.email);
  try {
    const email = req.params.email;
    
    // 直接使用 customer.email 查詢所有符合條件的預約
    const bookings = await Booking.find({ 'customer.email': email }).populate('course');
    
    if (!bookings.length) {
      console.log('No bookings found for email:', email);
      return res.status(404).json({ message: 'No bookings found for this email' });
    }

    console.log('Found bookings:', bookings);
    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// 創建新預約
router.post('/book', async (req, res) => {
  try {
    // 確保 req.user 已經存在，這樣可以使用當前用戶資料
    const newBooking = new Booking({
      course: req.body.courseId,
      customerId: req.user._id, // 使用當前使用者的 _id
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
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to book course' });
  }
});

module.exports = router;
