const getOrderItems = require('../orders/getOrderItems');
const queueService = require('../queueService');

/**
 * Create a Picking List for the Warehouse Workers
 * @param {Object} orderID - Object containing orderID and Products array.
 * @returns {any}
 */
const createPickingList = async (orderID) => {
    try {
        // get the data we need in a picking list: order items
        const orderItems = await getOrderItems(orderID);

        const filtered = [];

        // sort product locations based on quantity: lower first
        orderItems.products.forEach((item) => {
            item.locations.sort(
                (a, b) => a.location_quantity - b.location_quantity
            );

            // keep only the locations that are needed based on order_quantity
            let totalQuantity = 0;

            item.locations.forEach((l, index) => {
                if (totalQuantity < item.order_quantity) {
                    totalQuantity += l.location_quantity;

                    // if the diff is not 0, then it means current location has more than needed, so update its quantity
                    if (l.location_quantity - totalQuantity !== 0) {
                        const diff = totalQuantity - item.order_quantity;

                        l.location_quantity -= diff;
                    }
                } else {
                    // deleteCount is omitted, so it deletes all next locations that are not needed
                    item.locations.splice(index);
                }
            });

            // finally, reverse the locations array process from `getOrderItems`
            item.locations.forEach((l) => {
                filtered.push({
                    product_id: item.product_id,
                    name: item.name,
                    sku: item.sku,
                    counter_type: item.counter_type,
                    order_quantity: item.order_quantity,
                    location_id: l.location_id,
                    location_code: l.location_code,
                    location_quantity: l.location_quantity,
                    warehouse_sector: l.location_code.split('-')[0],
                });
            });
        });

        orderItems.products = filtered;

        // push the PickingList into the Task Queue
        await queueService.addTask('picking_list', orderItems);
    } catch (err) {
        console.error('[PICKING SERVICE] - Failed to create PickingList:', err);
    }
};

module.exports = createPickingList;
