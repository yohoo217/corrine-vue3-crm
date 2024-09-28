// server/routes/customers.js
const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const User = require('../models/User'); // Use the User model


// GET /api/customers
router.get('/', async (req, res) => {
  try {
    // Fetch all users without any filter
    const customers = await User.find({ isAdmin: false });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new customer
router.post('/', async (req, res) => {
  const customer = new Customer(req.body);
  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a customer
router.put('/:id', async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a customer
router.delete('/:id', async (req, res) => {
  try {
    console.log('Attempting to delete user with ID:', req.params.id);
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      console.log('User not found');
      return res.status(404).json({ message: "User not found" });
    }
    console.log('User deleted successfully:', deletedUser);
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
});

module.exports = router;