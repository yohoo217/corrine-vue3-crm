require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const customersRouter = require('./routes/customers');
const coursesRouter = require('./routes/courses');

const PORT = process.env.PORT || 5001;

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

// MongoDB 連接
const MONGODB_URI = process.env.MONGODB_URI;
console.log('MONGODB_URI:', MONGODB_URI);
// 導入路由
const userRoutes = require('./routes/users');


app.use('/api/users', userRoutes);

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in the environment variables.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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