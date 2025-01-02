const hash = require('../../authentication/hash');
const { generateJWT } = require('../../authentication/jwt');
const { crud } = require('../../database/db');
const { NotFoundError, userExistsError } = require('../../utils/errors');
const loadEnvConfig = require('../../utils/loadEnv');
const notificationService = require('../../services/v1/notifications/notificationService');

loadEnvConfig();

const signup = async (req, res, next) => {
    // extract credentials
    const { email, password } = req.body;

    try {
        // hash the password
        const hashedPass = hash(password);

        // save in db
        const results = await crud.add('c_users', [
            { email, password: hashedPass, role_id: 1 },
        ]);

        // user already exists
        if (!results) throw userExistsError;

        // generate token
        const token = generateJWT({ email, hashedPass }, '1d');

        // send mail
        notificationService.mail.sendEmailConfirmation(email, token);

        res.json({
            success: true,
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
