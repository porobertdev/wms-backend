const { crud } = require('../../../database/db');
const { NUM_ACCOUNT_LEVELS } = require('../../../database/seeder/constants');
const getCustomerOrders = require('../orders/getCustomerOrders');

const updateAccountLevel = async (id) => {
    // find which level the account is.

    // customerID
    const orders = await getCustomerOrders(id, { order_status: 'Completed' })
        .length;

    // -1 because the previous index is the correct level for this comparison
    const newLevel =
        NUM_ACCOUNT_LEVELS.filter((lvl) => orders <= lvl.orders).level - 1;

    const results = await crud.update('c_users', {
        data: {
            account_level: newLevel,
        },
        where: { id },
    });

    if (results.length > 0) {
        return {
            message: `Your account leveled up: ${level}, and you have unlocked a new voucher! Congratsulations!`,
        };
    }
};

module.exports = updateAccountLevel;
