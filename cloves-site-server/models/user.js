import mongoose from 'mongoose';
const shortid = require('shortid');

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
    type: Int16Array,
    default: 1
  },
  signupDate: {
    type: Date,
    default: new Data()
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
