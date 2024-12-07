const getOrderItems = require('../orders/getOrderItems');
const queueService = require('../queueService');
// const orderService = require('../orders/orderService');

/**
 * Create a Picking List for the Warehouse Workers
 * @param {Object} orderID - Object containing orderID and Products array.
 * @returns {any}
 */
const createPickingList = async (orderID) => {
    try {
        // get the data we need in a picking list: order items
        const orderItems = await getOrderItems(orderID);

        // choose one or more locations depending on how much quantity it has

        // push the PickingList into the Task Queue
        await queueService.addTask('picking_list', orderItems);
    } catch (err) {
        console.error('[PICKING SERVICE] - Failed to create PickingList:', err);
    }
};

module.exports = createPickingList;
