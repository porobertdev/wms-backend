const { warehouse } = require('../../database/db');

module.exports = {
    createWarehouse: async (req, res, next) => {
        console.log(req.body);
        // TODO: find a better way to catch errors with a plain .catch(next)
        // https://expressjs.com/en/guide/error-handling.html#:~:text=Use%20promises%20to%20avoid%20the%20overhead%20of%20the%20try...catch%20block%20or%20when%20using%20functions%20that%20return%20promises.%20For%20example%3A
        try {
            await warehouse.insertWarehouse(req.body);

            res.json({
                payload: req.body,
                success: true,
                message: 'The warehouse has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    createBinLocation: async (req, res, next) => {
        console.log(req.body);
        try {
            await warehouse.insertBinLocation(req.body);

            res.json({
                payload: req.body,
                success: true,
                message: 'The bin location has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
};
