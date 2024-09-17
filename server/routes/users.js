// server/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 註冊路由
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: '註冊成功' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 登入路由
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error('使用者不存在');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('密碼錯誤');

    const token = jwt.sign({ id: user._id }, '您的JWT秘密密鑰', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
