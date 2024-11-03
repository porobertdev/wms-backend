class CustomError extends Error {
    constructor(statusCode, msg) {
        super(msg);
        this.statusCode = statusCode;
    }
};

const ValidationError = () => new CustomError(400, 'Invalid Input.');
const NotFoundError = () => new CustomError(404, 'Not found: either expired or never existed 😢');
const RateLimitError = () => new CustomError(429, "You've hit the limit 😢. Please try again later.");


module.exports = {
    ValidationError,
    NotFoundError,
    RateLimitError
}