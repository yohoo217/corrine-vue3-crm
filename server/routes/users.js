// server/routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth'); // 从 /server/routes/users.js 指向 /middleware/auth.js

// 註冊路由
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password, isAdmin: false }); // 默认新注册用户不是管理员
    await user.save();
    res.status(201).json({ message: "註冊成功" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// server/routes/users.js
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("用户不存在");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("密码错误");

    // 根据 isAdmin 字段判断 role
    const role = user.isAdmin ? 'admin' : 'user'; // 如果 isAdmin 为 true，role 就是 admin，否则是 user

    // 使用判断后的 role 来生成 token
    const token = jwt.sign(
      { id: user._id, role }, // 确保从 isAdmin 字段推断 role
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, role }); // 确保返回正确的 role
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // 排除密碼字段
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
