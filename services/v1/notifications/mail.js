const nodemailer = require('nodemailer');
const loadEnvConfig = require('../../../utils/loadEnv');

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

// TODO: refactor this code to act like a class
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

const sendEmailConfirmation = async (to, token, first_name) => {
    const data = {
        to,
        subject: 'Please confirm your email address.',
        html: `
        Hi ${first_name},
        <br><br>
        Thanks for signing up on WMS e-commerce. We're thrilled to have you!
        
        <br>
        <br>
        To get started, please click the link below to verify we've got your correct email address. <strong>The link is available for 24 hours</strong>.

        <br>
        <br>
        <a href="${process.env.BASE_URL}/api/v1/signup/verify?token=${token}">Click here to verify your account.<a/>

        <br><br>
        Regards,
        The WMS Team`,
    };
    await sendMail(data);
};

const sendOrderConfirmation = async (to, id) => {
    const data = {
        to,
        subject: `[ORDER-${id}] - Your order has been confirmed.`,
        html: `
        Hi,
        <br><br>
        Thank you for choosing us!

        <br>
        <br>
        We'll send you the items as soon as possible. In the meantime, you can track your order status here: <a href="https://google.com">placeholder link</a>

        <br><br>
        Regards,
        The WMS Team`,
    };
    await sendMail(data);
};

module.exports = { sendEmailConfirmation, sendOrderConfirmation };
