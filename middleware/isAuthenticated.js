const { notAuthenticatedError } = require('../utils/errors');

const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        next(notAuthenticatedError);
    }

    next();
};

module.exports = isAuthenticated;
