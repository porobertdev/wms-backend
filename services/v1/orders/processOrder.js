const { crud } = require('../../../database/db');
const updateOrderStatus = require('./updateOrderStatus');

/**
 * This gets triggered by queueWorker when a new order is detected
 * @param {Number} id - Order ID
 * @param {Array} orderItems - payload from request, which is an array of products
 * @returns {any}
 */
const processOrder = async (id, orderItems) => {
    console.log(`[ORDER SERVICE] - Processing Order ${id}`);
    // const parsed = JSON.parse(orderItems);
    // console.log('🚀 ~ processOrder ~ parsed:', parsed);

    // TODO: if payment is confirmed
    // TODO: generate bill document
    // TODO: send email notification to customer & warehouse manager

    // update order status to `processed`
    await updateOrderStatus(id);

    // TODO: send shipment tracking number

    // extract the order items from payload
    // save the items in order_item
    await crud.add('order_item', orderItems);
    // create picking list
};

module.exports = processOrder;
