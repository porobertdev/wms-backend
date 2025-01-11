// because I like its simpler syntax instead the passport's implementation
const jwt = require('jsonwebtoken');
const loadEnvConfig = require('../utils/loadEnv');

loadEnvConfig();

const generateJWT = (payload, expiresIn) => {
    // Adam T - Looks good, though I would pass a default value to expiresIn
    const bearerToken = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn,
    });

    return bearerToken;
};

const isJWTValid = (token) => { // Adam T - Looks good
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        return true;
    } catch (err) {
        console.log('🚀 ~ isJWTValid ~ err:', err);
        return false;
    }
};

const extractJWT = (cookie) => {
    // console.log('🚀 ~ extractJWT ~ cookie:', cookie);

    // there's a ; at the end that needs to be removed
    // return cookie.split(' ')[0].split('bearer-token=')[0].replace(';', '');

    try {
        return cookie.split('bearer-token=')[1].replace(';', '');
    } catch (err) {
        // Adam T - JS is notoriously rubbish for error handling
        // any plans to write a custom error handler?
        console.error('Token not found!', err.message);
    }
};

module.exports = { generateJWT, isJWTValid, extractJWT };
