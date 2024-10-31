//server/routes/bookings.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // Booking 模型
const authMiddleware = require("../../middleware/auth");
const isAdmin = require("../../middleware/admin");

// 根據 email 獲取所有預約
router.get('/user/email/:email', authMiddleware, async (req, res) => {
  console.log('Fetching bookings for email:', req.params.email);
  try {
    const email = req.params.email;

    // 使用 customer.email 查詢符合條件的預約
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

// Admin 查看所有預約及其付款狀況
router.get('/admin/orders', authMiddleware, isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('course');

    if (!bookings.length) {
      console.log('No bookings found');
      return res.status(404).json({ message: 'No bookings found' });
    }

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching all bookings:', err);
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});


// 創建新預約
router.post('/', async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    
    // 檢查必要的字段是否存在
    if (!req.body.course || !req.body.name || !req.body.email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBooking = new Booking({
      course: req.body.course,
      customer: {
        name: req.body.name,
        email: req.body.email
      },
      date: new Date(),
      paymentStatus: req.body.paymentStatus || '未付款', // 新增這一行
    });

    console.log('New booking object:', newBooking);

    const savedBooking = await newBooking.save();
    console.log('Saved booking:', savedBooking);
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ error: 'Failed to book course', details: error.message });
  }
});

module.exports = router;
