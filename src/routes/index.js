import express from 'express';
import User from '../models/user.js';
import { addToMailchimp, sendVerificationEmail } from '../controllers/mail.js';
import { body, param, validationResult } from 'express-validator/check';
import crypto from 'crypto';

var router = express.Router();

const BIAS = 231;

async function getPosition(targetUser) {
  const sortedUsers = await User.find({}).sort({ points: -1, date: -1 }).exec();
  var index = sortedUsers.findIndex(user => {
    return user.email == targetUser.email
  });
  return BIAS + index;
}

router.post('/joinwaitlist', [
  body('email')
    .not().isEmpty()
    .isEmail()
    .normalizeEmail()
], function (req, res) {
  // Check for validation errors    
  var errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).send(errors); }

  User.findOne({ email: req.body.email }, function (err, user) {
    console.log('checking if user exists');
    // Make sure user doesn't already exist
    if (user) {
      // Update referral to latest person if not null
      console.log(user.referralSource);
      console.log(req.body.referralSource);
      if (req.body.referralSource !== null && !user.referralSource) {
        user.referralSource = req.body.referralSource;
        user.save();
      }

      getPosition(user).then(position => {
        console.log('returning existing user');
        return res.status(200).send({
          'referralCode': user.referralCode,
          'position': position
        });
      });
    } else {

      console.log('creating new user');

      // Create new user
      var newUser = new User({
        email: req.body.email,
        referralSource: req.body.referralSource,
        verificationToken: crypto.randomBytes(16).toString('hex')
      });

      newUser.save(function (err, newUser) {
        if (err) return console.error(err);

        getPosition(newUser).then(position => {
          console.log('returning new user');
          return res.status(200).send({
            'referralCode': newUser.referralCode,
            'position': position
          });
        });

        // Add to Mailchimp list
        addToMailchimp(req.body.email);

        // Send verification email
        sendVerificationEmail(req.body.email, req.headers.host, newUser.verificationToken)
      });
    }
  });
});

// For verification, see https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
router.post('/verify/:token', [
  param('token')
    .not().isEmpty()
], function (req, res) {
  // Check for validation errors    
  var errors = validationResult(req);
  if (!errors.isEmpty()) { return res.status(400).send(errors); }

  // Find a matching token
  User.findOne({ verificationToken: req.params.token }, function (err, user) {
    if (!user) return res.status(400).send({ type: 'not-verified' });

    if (user.verified) return res.status(200).send({ type: 'already-verified', email: user.email });

    // Verify and save the user
    user.verified = true;
    user.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }
      res.status(200).send({ type: 'verified', email: user.email });
    });

    // Increment points for the user who referred them
    User.findOne({ referralCode: user.referralSource }, function (err, referringUser) {
      if (referringUser) {
        referringUser.points++;
        referringUser.save();
      }
    });
  });
});

export default router;