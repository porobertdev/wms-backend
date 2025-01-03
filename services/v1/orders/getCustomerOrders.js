const { crud } = require('../../../database/db');

/**
 * Get Customer Orders
 * @param {Number} id - Customer ID to filter orders
 * @param {Object} where - additional conditions for matching rows
 * @returns {Array} - all values that were found
 */
const getCustomerOrders = async (id, where) => {
    // find which level the account is.
    // const level = {NUM_ACCOUNT_LEVELS.filter((lvl, index) => lvl.orders)}

    const results = await crud.get('customer_order', {
        where: { customer_id: id, ...where },
    });

    return results;
};

module.exports = getCustomerOrders;
