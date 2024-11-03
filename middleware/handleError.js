module.exports = {
    handleError: (err, req, res, next) => {
        console.log(err);

        res.status(err.statusCode).send({ error: err.message });
    }
}