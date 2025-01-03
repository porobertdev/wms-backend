const { crud } = require('../../database/db');
const updateAccountLevel = require('../../services/v1/profile/updateAccountLevel');
const { NotFoundError, userExistsError } = require('../../utils/errors');

const account = async (req, res, next) => {
    const { user } = req;
    console.log('🚀 ~ account ~ user:', user);

    // try to update the account level if it's required
    await updateAccountLevel(user.id);
};

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
