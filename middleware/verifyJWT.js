const jwt = require('jsonwebtoken');
const { invalidTokenError } = require('../utils/errors');
const { extractJWT } = require('../authentication/jwt');

const verifyAcessToken = async (req, res, next) => {
    let token;

    if (req.query.token) {
        token = req.query.token;
    } else {
        token = extractJWT(req.headers.cookie);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            next(invalidTokenError);
        } else {
            req.decodedToken = decoded;
            next();
        }
    });
};

module.exports = verifyAcessToken;
