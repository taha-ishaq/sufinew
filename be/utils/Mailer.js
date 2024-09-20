// utils/mailer.js
const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
        user: 'commandergerm@gmail.com',
        pass: 'qtql suzv xeni qcvo'
    }
});

const sendOrderNotification = async (checkoutData) => {
    const mailOptions = {
        from: EMAIL_USER,
        to: ['tahaishaq7346@gmail.com', 'mahrukhazhar3@gmail.com'], // List of recipients
        subject: 'New Order Received',
        text: `A new order has been placed with the following details:\n\n${JSON.stringify(checkoutData, null, 2)}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Notification sent to both recipients');
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = sendOrderNotification;
