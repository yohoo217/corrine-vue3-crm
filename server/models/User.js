// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false }, // 改為非必填
  isAdmin: { type: Boolean, default: false },
  googleId: { type: String, unique: true, sparse: true }, // 新增 googleId
});

// 密碼哈希處理
UserSchema.pre('save', async function (next) {
  if (!this.password || !this.isModified('password')) return next(); // 如果密碼不存在，直接跳過
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 新增 comparePassword 方法
UserSchema.methods.comparePassword = async function (inputPassword) {
  try {
    // 使用 bcrypt.compare 對比密碼
    return await bcrypt.compare(inputPassword, this.password);
  } catch (err) {
    throw new Error('密碼比對失敗');
  }
};

module.exports = mongoose.model('User', UserSchema);
