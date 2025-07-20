require('dotenv').config();
const nodemailer = require('nodemailer');
const { secret } = require('./secret');

// Promisify transporter.verify for async/await
const verifyTransporter = (transporter) =>
    new Promise((resolve, reject) => {
        transporter.verify((err, success) => {
            if (err) reject(err);
            else resolve(success);
        });
    });

module.exports.sendEmail = async (body, res, message) => {
    try {
        // Create transporter with Gmail settings
        const transporter = nodemailer.createTransport({
            service: secret.email_service, // "gmail"
            host: secret.email_host, // "smtp.gmail.com"
            port: parseInt(secret.email_port), // 587
            secure: secret.email_port === "465", // false for 587, true for 465
            auth: {
                user: secret.email_user, // medicalassistant780@gmail.com
                pass: secret.email_pass, // srst nmbc zxqu qxey
            },
        });

        // Verify transporter
        await verifyTransporter(transporter);
        console.log('Server is ready to take our messages');

        // Send email
        const info = await transporter.sendMail(body);
        console.log('Email sent:', info.messageId);

        // Send single response
        return res.send({ message });
    } catch (error) {
        console.error('Email error:', error.message);
        return res.status(403).send({
            message: `Error: ${error.message}`,
        });
    }
};