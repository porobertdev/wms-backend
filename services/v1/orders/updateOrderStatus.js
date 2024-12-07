const { crud } = require('../../../database/db');

const updateOrderStatus = async (id) => {
    const results = await crud.update('customer_order', {
        data: {
            order_status: 'Processed',
        },
        where: { id },
    });

    if (results.length === 0) {
        return { message: `Order status for id ${id} could not be updated.` };
    }
};

module.exports = updateOrderStatus;
