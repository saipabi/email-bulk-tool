const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Email = require('../models/Email');

router.post('/send', async (req, res) => {
    const { subject, body, recipients } = req.body;

    // Save email to database
    const email = new Email({ subject, body, recipients });
    await email.save();

    // Configure nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Send emails
    let promises = recipients.map(recipient => {
        return transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: recipient,
            subject: subject,
            text: body
        });
    });

    Promise.all(promises)
        .then(() => res.status(200).json({ message: 'Emails sent successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
