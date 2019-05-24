import mongoose from 'mongoose';
const shortid = require('shortid');
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 1
  },
  signupDate: {
    type: Date,
    default: new Date()
  },
  referralCode: {
    type: String,
    default: shortid.generate,
    unique: true
  },
  token: {
    type: String,
    default: crypto.randomBytes(16).toString('hex')
  }
});

const User = mongoose.model('User', userSchema);

export default User;
