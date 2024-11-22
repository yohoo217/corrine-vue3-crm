//server/routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth');
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// 註冊路由
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 確認 email 是否已被註冊
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email 已被註冊" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, isAdmin: false });

    await user.save();
    res.status(201).json({ message: "註冊成功" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 用戶登入路由
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  // 根據用戶的 isAdmin 欄位設定角色
  const role = user.isAdmin ? 'admin' : 'user';

  // 生成 JWT，將 role 包含在 payload 中
  const token = jwt.sign(
    { id: user._id, role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, role });
});



// 獲取當前用戶資料
router.get("/me", auth, async (req, res) => {
  try {
    console.log('req.user:', req.user); // 檢查 req.user 是否包含 id
    const user = await User.findById(req.user.id).select("-password");
    console.log('Fetched user:', user); // Add this line to debug
    if (!user) return res.status(404).json({ error: "用户不存在" });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: "伺服器錯誤" });
  }
});

// Google OAuth 配置
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5001/api/users/google-callback'
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'https://wangcom.online/api/users/google-callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId = profile.id;
            await user.save();
          } else {
            user = await User.create({
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
          }
        }
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google 登入路由
router.get(
  "/google-login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google 回調路由
router.get(
  "/google-callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    try {
      const user = req.user;
      if (!user) return res.status(400).send("用户认证失败");

      // 生成 JWT
      const token = jwt.sign(
        { id: user._id, role: user.isAdmin ? 'admin' : 'user' },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // 將 token 傳回前端，安全性改進
      res.redirect(`http://localhost:8080?token=${encodeURIComponent(token)}&isAdmin=${user.isAdmin}`);
    } catch (error) {
      res.status(500).send("伺服器錯誤");
    }
  }
);

module.exports = router;
