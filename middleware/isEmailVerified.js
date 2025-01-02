const { NotVerifiedEmail } = require('../utils/errors');

const isEmailVerified = (req, res, next) => {
    console.log(req.user);
    if (!req.user.isverified) {
        next(NotVerifiedEmail);
    }

    next();
};

module.exports = isEmailVerified;
