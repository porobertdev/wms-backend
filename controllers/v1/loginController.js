const { generateJWT } = require('../../authentication/jwt');
const passport = require('../../authentication/passport');
const isEmailVerified = require('../../middleware/isEmailVerified');
const loadEnvConfig = require('../../utils/loadEnv');

loadEnvConfig();

const get = (req, res) => {
    res.json({ message: 'Login page' });
};

const post = [
    passport.authenticate('local', {
        failureRedirect: '/api/v1/login',
        // TODO: pass the error message in the response by using a cb argument. Reference: https://stackoverflow.com/a/74116654/21600888
        // failureMessage: true,
        session: false,
    }),
    isEmailVerified,
    (req, res) => {
        /*
        This middleware runs if authentication is successful, so `req.user` from passport is available
        
        passport.authenticate returns a middleware (req, res, next) - Thanks @StackOverflow: https://stackoverflow.com/a/71110945/21600888 
        */
        console.log('🚀 ~ req:', req.user);

        // allow user to stay logged in for 7 days
        const bearerToken = generateJWT(req.user, '7d');

        /*
        localStorage seems to be recommended (tho still has security flaws),
        but for simplicity, just set it as a cookie
        */
        res.cookie('bearer-token', bearerToken);
        res.json({
            message: 'You have logged in successfully.',
            user: {
                id: req.user.id,
                email: req.user.email,
                role_id: req.user.role_id,
                isverified: req.user.isverified,
            },
        });
        // res.redirect('/');
    },
];

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    // res.redirect('/');
    res.json({ message: 'You have logged out.' });
};

module.exports = { get, post, logout };
