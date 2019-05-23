var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/joinwaitlist', function (req, res, next) {

  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('email', 'Email cannot be blank').notEmpty();
  // req.sanitize('email').normalizeEmail({ remove_dots: false });

  // Check for validation errors    
  // var errors = req.validationErrors();
  // if (errors) { return res.status(400).send(errors); }

  // Make sure this account doesn't already exist
  User.findOne({ email: req.query.email }, function (err, user) {

    // Make sure user doesn't already exist
    if (user) return res.status(400).send({ msg: 'The email address you have entered is already associated with another account.' });

    var newUser = new User({
      email: req.query.email
    });

    newUser.save(function (err, newUser) {
      if (err) return console.error(err);

      // Send verification email
      var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
      var mailOptions = {
        from: 'no-reply@getcloves.com',
        to: newUser.email,
        subject: 'Email Verification for Waitlist',
        text: 'Hello,\n\n' + 'Please verify your email by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + newUser.token + '.\n'
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + newUser.email + '.');
      });
    });
  });
});

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

module.exports = router;
