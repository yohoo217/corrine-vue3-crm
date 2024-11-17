// server/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// 靜態文件
app.use(express.static(path.join(__dirname, 'public')));

// CORS 配置
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Express session 配置
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Passport 初始化
app.use(passport.initialize());
app.use(passport.session());

// 日誌中間件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 路由引入
const customersRouter = require(path.resolve(__dirname, 'routes/customers'));
const coursesRouter = require(path.resolve(__dirname, 'routes/courses'));
const bookingsRouter = require(path.resolve(__dirname, 'routes/bookings'));
const paymentRouter = require(path.resolve(__dirname, 'routes/payment'));
const usersRouter = require(path.resolve(__dirname, 'routes/users'));


// 路由使用
app.use('/api/customers', customersRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/users', usersRouter);

// 測試路由
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

// MongoDB 連接
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// 錯誤處理中間件
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
