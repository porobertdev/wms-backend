module.exports = {
    handleError: (err, req, res, next) => {
        console.log(`Error: ${err.message}`);

        res.status(err.statusCode || 401).send({ error: err.message });
    },
};
