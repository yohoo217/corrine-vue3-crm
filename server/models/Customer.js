const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  lastContact: { type: Date, default: Date.now }
});



module.exports = mongoose.model('Customer', CustomerSchema);