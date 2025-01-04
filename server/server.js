// server/server.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

// 導入路由
const userRoutes = require('./routes/users');
const coursesRouter = require('./routes/courses');
const bookingsRouter = require('./routes/bookings');
const paymentRouter = require('./routes/payment');

// MongoDB 連接
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

const PORT = process.env.PORT || 5001;

// 日誌中間件（方便開發調試）
app.use((req, res, next) => {
  if (!req.url.startsWith('/api/')) {
    return express.static(path.join(__dirname, '../dist'))(req, res, next);
  }
  next();
});


// Express session 配置
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: { secure: false }, // HTTPS 下設置為 true，本地開發設置為 false
  })
);

// CORS 配置
app.use(
  cors({
    origin: ['http://localhost:8080', 'http://localhost:5002', 'https://wangcom.online'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// 請求解析中間件
app.use(express.json());

// Passport 初始化
app.use(passport.initialize());
app.use(passport.session());

// API 路由
app.use('/api/users', userRoutes);
app.use('/api/courses', coursesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/payment', paymentRouter);

// 測試路由（確認伺服器是否運行）
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// 靜態文件服務
app.use(express.static(path.join(__dirname, '../dist')));

// 通配符路由（處理 SPA 的前端路由）
app.get('*', (req, res, next) => {
  console.log('Fallback Route Hit:', req.url);
  if (req.url.startsWith('/api/')) {
    return next(); // 將請求交給其他路由處理
  }
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 錯誤處理中間件
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// MongoDB 連接
mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
