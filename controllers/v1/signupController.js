const hash = require('../../authentication/hash');
const { generateJWT } = require('../../authentication/jwt');
const { crud } = require('../../database/db');
const { NotFoundError, userExistsError } = require('../../utils/errors');
const loadEnvConfig = require('../../utils/loadEnv');
const sendMail = require('../../utils/sendMail');

loadEnvConfig();

const signup = async (req, res, next) => {
    // extract credentials
    const { email, username, password } = req.body;

    try {
        // hash the password
        const hashedPass = hash(password);

        // save in db
        const results = await crud.add('c_users', [
            { email, username, password: hashedPass, role_id: 1 },
        ]);

        // user already exists
        if (!results) throw userExistsError;

        // generate token
        const token = generateJWT({ email, username, hashedPass }, '1d');

        // send mail
        sendMail({
            to: email,
            subject: 'Please confirm your email address.',
            html: `
            Hi,
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
        });

        res.json({
            message: 'Please check your mail inbox to confirm your email.',
        });
    } catch (err) {
        next(err);
    }
};

const verifyEmail = async (req, res, next) => {
    const { email } = req.decodedToken;

    try {
        const rows = await crud.get('c_users', { email });
        const user = rows[0];

        if (!user) {
            next(NotFoundError);
        }

        if (!user.isverified) {
            await crud.update('c_users', {
                data: { isverified: true },
                where: {
                    email,
                },
            });

            res.status(200).json({
                message: 'Your email has been confirmed.',
            });
        } else {
            res.json({ messsage: 'You have already verified your email.' });
            next();
        }
    } catch (err) {
        next(err);
    }
};

module.exports = { signup, verifyEmail };
