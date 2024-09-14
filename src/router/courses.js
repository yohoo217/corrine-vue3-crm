// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().lean();
    const coursesWithId = courses.map(course => ({
      ...course,
      id: course._id.toString() // 添加 id 字段
    }));
    res.json(coursesWithId);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ message: 'Error fetching courses', error: error.message });
  }
});

router.post('/', async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add more route handlers for update and delete operations

module.exports = router;