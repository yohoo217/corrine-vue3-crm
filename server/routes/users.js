// server/routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require('../../middleware/auth'); // 从 /server/routes/users.js 指向 /middleware/auth.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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
      { id: user._id, role: user.role }, // 從資料庫中的 role 欄位取得角色
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

// Google OAuth 配置
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5001/api/users/google-callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // 用 googleId 查找用戶
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // 如果沒有 googleId，檢查 email 是否已存在
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            // 如果 email 已存在，更新該用戶的 googleId
            user.googleId = profile.id;
            await user.save();
          } else {
            // 如果 email 不存在，創建新用戶
            user = await User.create({
              username: profile.displayName,
              email: profile.emails[0].value,
              googleId: profile.id,
            });
          }
        }

        return done(null, user);
      } catch (error) {
        console.error('Error in Google Strategy:', error);
        return done(error, null);
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
  '/google-login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google 回調路由
router.get(
  '/google-callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    try {
      console.log('Google OAuth Callback Triggered');
      const user = req.user;

      if (!user) {
        console.error('User not found in callback');
        return res.status(400).send('User authentication failed.');
      }

      console.log('Authenticated User:', user);

      // 根據 isAdmin 判斷 role
      const role = user.isAdmin ? 'admin' : 'user';

      // 生成 JWT
      const token = jwt.sign(
        { id: user._id, role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      console.log('JWT Generated:', token);

      // 將 token 和 role 一起傳遞給前端
      res.redirect(`http://localhost:8080?token=${token}&role=${role}`);
    } catch (error) {
      console.error('Error in Google Callback:', error);
      res.status(500).send('Something went wrong!');
    }
  }
);








module.exports = router;