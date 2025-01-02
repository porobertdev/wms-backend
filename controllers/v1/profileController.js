const { crud } = require('../../database/db');
const { NotFoundError, userExistsError } = require('../../utils/errors');

const account = async (req, res, next) => {};

// TODO: WIP
const getOrders = async (req, res, next) => {
    try {
        const { id } = req.user;
        const results = await crud.get('customer_order', { id });

        res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};

module.exports = account;
