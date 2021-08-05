// Third Party Imports
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'passwordConfirm is required'],
    validate: function validator(v) {
      return this.password === v;
    },
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  passwordResetToken: { type: String, select: false },
  passwordResetExpiry: { type: Date, select: false },
});

/**
 * If password modified
 * Encrypt the password
 * Delete the password confirm field
 */
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate('cart.products');
  next();
});

userSchema.methods.comparePassword = async function (
  inputPassword,
  correctPassword
) {
  return await bcrypt.compare(inputPassword, correctPassword);
};

userSchema.methods.generateJWT = async function (id) {
  return await jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

userSchema.methods.generatePasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  const encryptedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetToken = encryptedResetToken;
  this.passwordResetExpiry = Date.now() + 10 * 60 * 60 * 1000; // 10 minutes

  return resetToken;
};

userSchema.methods.verifyPasswordResetToken = function (passwordResetToken) {
  let isTokenValid = true;

  if (
    this.passwordResetToken !==
    crypto.createHash('sha256').update(passwordResetToken).digest('hex')
  ) {
    isTokenValid = false;
  }

  if (Date.now() > this.passwordResetExpiry) {
    isTokenValid = false;
  }

  return isTokenValid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
