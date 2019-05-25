import express from 'express';
import User from '../models/user.js';
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/joinwaitlist', function (req, res, next) {
  console.log('Hit joinwaitlist');

  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('email', 'Email cannot be blank').notEmpty();
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  // var errors = req.validationErrors();
  // if (errors) { return res.status(400).send(errors); }

  // Make sure this account doesn't already exist
  User.findOne({ email: req.query.email }, function (err, user) {

    console.log('entered find');

    // Make sure user doesn't already exist
    if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });

    var newUser = new User({
      email: req.query.email
    });

    newUser.save(function (err, newUser) {
      if (err) return console.error(err);

      res.status(200).send({
        'referralCode': newUser.referralCode
      });

      // // Send verification email
      // var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      // var mailOptions = {
      //   from: 'no-reply@getwisdomapp.com',
      //   to: newUser.email,
      //   subject: 'Email Verification for Waitlist',
      //   text: 'Hello,\n\n' + 'Please verify your email by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + newUser.token + '.\n'
      // };
      // transporter.sendMail(mailOptions, function (err) {
      //   if (err) { console.log({ msg: err.message }); }
      // });
    });
  });
});

// For verification, see https://codemoto.io/coding/nodejs/email-verification-node-express-mongodb
router.get('/confirmation', function (req, res, next) {
  req.assert('token', 'Token cannot be blank').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  var errors = req.validationErrors();
  if (errors) return res.status(400).send(errors);

  // Find a matching token
  User.findOne({ token: req.body.token }, function (err, token) {
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token.' });

    if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

    // Verify and save the user
    user.verified = true;
    user.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }
      res.status(200).send("This email has been verified.");
    });
  });
});

router.post('/getReferralCode', function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid user.' });
    res.status(200).send({
      'referralCode': user.referralCode
    });
  });
});

export default router;