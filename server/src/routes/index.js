import express from 'express';
import User from '../models/user.js';
import { sendVerificationEmail } from '../controllers/mail.js';
var router = express.Router();

const BIAS = 231;

function getPosition(user) {
  var sortedUsers = User.find().sort({points: -1, date: -1});
  return sortedUsers.indexOf({ email: user.email });
}

router.post('/joinwaitlist', function (req, res) {
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('email', 'Email cannot be blank').notEmpty();
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  // var errors = req.validationErrors();
  // if (errors) { return res.status(400).send(errors); }

  // Make sure this account doesn't already exist
  User.findOne({ email: req.body.email }, function (err, user) {
    // Make sure user doesn't already exist
    if (user) {
      return res.status(200).send({
        'referralCode': user.referralCode,
        'position': BIAS + getPosition(user)
      });
    }

    var newUser = new User({
      email: req.body.email,
      referralSource: req.body.referralSource
    });

    newUser.save(function (err, newUser) {
      if (err) return console.error(err);

      res.status(200).send({
        'referralCode': newUser.referralCode,
        'position': BIAS + getPosition(newUser)
      });

      // Send verification email
      sendVerificationEmail(req.body.email, req.headers.host, newUser.verificationToken)
    });
  });
});

// For verification, see https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
router.get('/confirmation/:token', function (req, res) {
  // req.assert('token', 'Token cannot be blank').notEmpty();
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  // var errors = req.validationErrors();
  // if (errors) return res.status(400).send(errors);

  // Find a matching token
  User.findOne({ verificationToken: req.params.token }, function (err, user) {
    if (!user) return res.status(400).send({ type: 'not-verified', msg: 'Unable to find email' });

    if (user.verified) return res.status(400).send({ type: 'already-verified', msg: 'This email has already been verified for Wisdom' });

    // Verify and save the user
    user.verified = true;
    user.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }
      res.status(200).send("Your email has been verified for Wisdom");
    });
  });

  // Increment points for the user who referred them
  User.findOne({ referralCode: user.referralSource }, function (err, referringUser) {
    if (referringUser) {
      referringUser.points++;
      referringUser.save(function (err, referringUser) {
        if (err) return console.error(err);
      });
    }
  });
});

export default router;