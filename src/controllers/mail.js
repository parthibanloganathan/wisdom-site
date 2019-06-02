import nodemailer from 'nodemailer';
import nodemailermg from 'nodemailer-mailgun-transport';
import Mailchimp from 'mailchimp-api-v3';

require('dotenv').config();

// Mailgun
const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: 'mail.getwisdomapp.com'
    }
}

const nodemailerMailgun = nodemailer.createTransport(nodemailermg(auth));

export function sendVerificationEmail(email, host, token) {
    nodemailerMailgun.sendMail({
        from: 'wisdom-no-reply@getwisdomapp.com',
        to: email,
        subject: 'Verify your email for Wisdom',
        text: 'Hello,\n\n' +
            'Please verify your email by clicking this link: \n' +
            'http:\/\/' + host + '\/verify\/' + token + '\n\n' +
            'Best,\n' +
            'Your friends at Wisdom'
    }, (err, info) => {
        if (err) {
            console.log(`Error: ${err}`);
        }
        else {
            console.log(`Response: ${info}`);
        }
    });
}

// Mailchimp
var mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

export function addToMailchimp(email) {
    mailchimp.post('/lists/' + process.env.MAILCHIMP_LIST_ID + '/members', {
        email_address: email,
        status: 'subscribed'
    }).catch(function (err) {
        console.log(err);
    });
}