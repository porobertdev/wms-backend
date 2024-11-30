module.exports = {
    handleError: (err, req, res, next) => {
        console.log(err);

        res.status(err.statusCode || 401).send({ error: err.message });
    },
};
