// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  // 基本資訊
  username: { 
    type: String, 
    required: true, 
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, '請輸入有效的電子郵件']
  },
  password: { 
    type: String, 
    required: false, // 因為 Google 登入不需要密碼
    minlength: 6,
    select: false // 預設查詢不返回密碼
  },

  // 用戶角色和狀態
  role: {
    type: String,
    enum: ['admin', 'user', 'instructor'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },

  // 個人資料
  profile: {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    phoneNumber: { type: String },
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String
    },
    avatar: String,
    bio: { type: String, maxlength: 500 }
  },

  // 認證相關
  auth: {
    googleId: { type: String, unique: true, sparse: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationToken: String,
    emailVerificationExpires: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    lastLogin: Date
  },

  // 系統相關
  metadata: {
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastActiveAt: { type: Date },
    loginCount: { type: Number, default: 0 }
  }
}, {
  timestamps: true // 自動管理 createdAt 和 updatedAt
});

// 索引
UserSchema.index({ email: 1 });
UserSchema.index({ 'auth.googleId': 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ status: 1 });

// 密碼哈希中間件
UserSchema.pre('save', async function (next) {
  if (!this.password || !this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 更新時間中間件
UserSchema.pre('save', function(next) {
  this.metadata.updatedAt = new Date();
  next();
});

// 實例方法
UserSchema.methods = {
  // 比對密碼
  comparePassword: async function(candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
  },

  // 更新最後活動時間
  updateLastActive: function() {
    this.metadata.lastActiveAt = new Date();
    this.metadata.loginCount += 1;
    return this.save();
  },

  // 生成密碼重置 token
  generatePasswordReset: function() {
    this.auth.passwordResetToken = crypto.randomBytes(20).toString('hex');
    this.auth.passwordResetExpires = Date.now() + 3600000; // 1 hour
    return this.save();
  }
};

// 靜態方法
UserSchema.statics = {
  // 根據 email 或 googleId 查找用戶
  findByLogin: async function(login) {
    let user = await this.findOne({
      $or: [
        { email: login.toLowerCase() },
        { 'auth.googleId': login }
      ]
    });
    return user;
  },

  // 獲取活躍用戶
  getActiveUsers: function() {
    return this.find({ status: 'active' });
  }
};

// 虛擬屬性
UserSchema.virtual('fullName').get(function() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

module.exports = mongoose.model('User', UserSchema);
