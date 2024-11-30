const nodemailer = require('nodemailer');
const loadEnvConfig = require('./loadEnv');

loadEnvConfig();

const transporter = nodemailer.createTransport({
    host: 'smtp.resend.com',
    secure: true,
    port: 465,
    auth: {
        user: 'resend',
        pass: process.env.API_KEY_RESEND,
    },
});

const sendMail = async ({ to, subject, html }) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html,
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

module.exports = sendMail;
