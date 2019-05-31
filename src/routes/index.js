// import express from 'express';
// import User from '../models/user.js';
// import { sendVerificationEmail } from '../controllers/mail.js';
// var router = express.Router();

// const BIAS = 231;

// async function getPosition(targetUser) {
//   const sortedUsers = await User.find({}).sort({ points: -1, date: -1 }).exec();
//   var index = sortedUsers.findIndex(user => {
//     return user.email == targetUser.email
//   });
//   return BIAS + index;
// }

// router.post('/joinwaitlist', function (req, res) {
//   req.assert('email', 'Email is not valid').isEmail();
//   req.assert('email', 'Email cannot be blank').notEmpty();
//   req.sanitize('email').normalizeEmail({ remove_dots: false });

//   // Check for validation errors    
//   var errors = req.validationErrors();
//   if (errors) { return res.status(400).send(errors); }

//   // Make sure this account doesn't already exist
//   User.findOne({ email: req.body.email }, function (err, user) {
//     // Make sure user doesn't already exist
//     if (user) {
//       // Update referral to latest person
//       user.referralSource = req.body.referralSource; 
//       user.save(function (err) {
//         if (err) { return res.status(500).send({ msg: err.message }); }
//       });

//       getPosition(user).then(position => {
//         return res.status(200).send({
//           'referralCode': user.referralCode,
//           'position': position
//         });
//       });
//     }

//     // Create new user
//     var newUser = new User({
//       email: req.body.email,
//       referralSource: req.body.referralSource
//     });

//     newUser.save(function (err, newUser) {
//       if (err) return console.error(err);

//       getPosition(newUser).then(position => {
//         return res.status(200).send({
//           'referralCode': newUser.referralCode,
//           'position': position
//         });
//       });

//       // Send verification email
//       sendVerificationEmail(req.body.email, req.headers.host, newUser.verificationToken)
//     });
//   });
// });

// // For verification, see https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
// router.post('/verify/:token', function (req, res) {
//   req.assert('token', 'Token cannot be blank').notEmpty();

//   // Check for validation errors    
//   var errors = req.validationErrors();
//   if (errors) return res.status(400).send(errors);

//   // Find a matching token
//   User.findOne({ verificationToken: req.params.token }, function (err, user) {
//     if (!user) return res.status(400).send({ type: 'not-verified' });

//     if (user.verified) return res.status(200).send({ type: 'already-verified', email: user.email });

//     // Verify and save the user
//     user.verified = true;
//     user.save(function (err) {
//       if (err) { return res.status(500).send({ msg: err.message }); }
//       res.status(200).send({ type: 'verified', email: user.email });
//     });

//     // Increment points for the user who referred them
//     User.findOne({ referralCode: user.referralSource }, function (err, referringUser) {
//       if (referringUser) {
//         referringUser.points++;
//         referringUser.save(function (err, referringUser) {
//           if (err) return console.error(err);
//         });
//       }
//     });
//   });
// });

// export default router;