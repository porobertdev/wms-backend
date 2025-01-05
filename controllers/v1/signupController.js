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
    const { first_name, last_name, birth_date, city, address, phone_number } =
        req.body;

    try {
        // hash the password
        const hashedPass = hash(password);

        // save in db
        const results = await crud.add('c_users', [
            { email, password: hashedPass, role_id: 1 },
        ]);

        // user already exists
        if (!results) throw userExistsError;

        // save person info
        const person = await crud.add('person', [
            {
                first_name,
                last_name,
                birth_date /* new Date(birth_date).toISOString().slice(0, 10) */,
                city,
                address,
                phone_number,
            },
        ]);

        // add new customer
        const customer = await crud.add('customer', [
            { person_id: person[0].id, type: 'business' },
        ]);

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
