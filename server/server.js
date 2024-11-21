//server/server.js
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const customersRouter = require('./routes/customers');
const coursesRouter = require('./routes/courses');

// MongoDB 連接
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI:', MONGODB_URI);

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

const PORT = process.env.PORT || 5001;

// Express session 配置
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret', // 從 .env 讀取 SESSION_SECRET
    resave: false, // 不要在每次請求時重新保存 session
    saveUninitialized: false, // 只有在內容變更時才保存 session
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: { secure: false }, // HTTPS 下設置為 true，本地開發設置為 false
  })
);

app.use(express.static(path.join(__dirname, '../dist')));

// CORS 配置應該在其他中間件和路由之前
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5002'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api/courses', coursesRouter);
app.use('/api/customers', customersRouter);



// Passport 初始化
app.use(passport.initialize());
app.use(passport.session());

// 日誌中間件
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// 路由
app.use('/api/customers', require('./routes/customers'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/bookings', require('./routes/bookings'));

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


app.use('/api/payment', require('./routes/payment')); // 使用支付路由，與其他路由一致



// 導入路由
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);



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

console.log('MONGODB_URI:', process.env.MONGODB_URI);
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);