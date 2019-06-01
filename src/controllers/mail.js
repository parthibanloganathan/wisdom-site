import nodemailer from 'nodemailer';
import nodemailermg from 'nodemailer-mailgun-transport';
require('dotenv').config();

const auth = {
    auth: {
        api_key: process.env.MAILGUN_API_KEY,
        domain: 'mail.getwisdomapp.com'
    }
}

const nodemailerMailgun = nodemailer.createTransport(nodemailermg(auth));

export function sendVerificationEmail(email, host, token) {
    nodemailerMailgun.sendMail({
        from: 'support@getwisdomapp.com',
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