// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: 'http://localhost:8080', // 替換成你的前端URL
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));app.use(express.json());

const coursesRouter = require('./server/routes/courses');
const bookingsRouter = require('./server/routes/bookings');
const customersRouter = require('./server/routes/customers');

app.use('/api/courses', coursesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/customers', customersRouter);

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// TODO: Add route handlers here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});