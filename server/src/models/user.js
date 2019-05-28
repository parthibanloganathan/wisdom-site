import mongoose from 'mongoose';
const shortid = require('shortid');
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 1,
    index: true
  },
  signupDate: {
    type: Date,
    default: new Date(),
    index: true
  },
  referralCode: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  referralSource: {
    type: String
  },
  verificationToken: {
    type: String,
    default: crypto.randomBytes(16).toString('hex'),
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
