const createReqError = (statusCode, msg) => {
    const error = new Error(msg);
    error.statusCode = statusCode;

    return error;
};

const ValidationError = createReqError(400, 'Invalid Input.');
const NotFoundError = createReqError(
    404,
    'Not found: either expired or never existed 😢'
);
const RateLimitError = createReqError(
    429,
    "You've hit the limit 😢. Please try again later."
);
const invalidTokenError = createReqError(401, 'Token is invalid!');
const userExistsError = createReqError(
    401,
    'An account with that email already exists.'
);
const notAuthenticatedError = createReqError(401, 'You are not authenticated');

module.exports = {
    ValidationError,
    NotFoundError,
    RateLimitError,
    invalidTokenError,
    userExistsError,
    notAuthenticatedError,
};
