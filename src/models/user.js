import mongoose from 'mongoose';
const shortid = require('shortid');

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
    type: String,
    default: null
  },
  verificationToken: {
    type: String,
    unique: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
