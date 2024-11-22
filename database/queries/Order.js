const pool = require('../pool');

/**
 * Add a new order
 * @param {Object} data
 * @param {Number} data.customer_id - Customer ID
 * @param {Date} data.shipping_date - Shipping Date
 */
const insertOrder = async (data) => {
    const { customer_id, shipping_date } = data;

    await pool.query(
        `
        INSERT INTO customer_order
        (customer_id, shipping_date)
        VALUES ($1, $2)
        `,
        [customer_id, shipping_date]
    );
};

/**
 * Return all packages of a delivery route
 * @param {number} routeID - route ID from delivery_route
 */
const getCustomerOrders = async (customerID) => {
    const results = await pool.query(
        `
        SELECT * FROM customer_order
        WHERE customer_id = ${customerID}
        `
    );

    return results.rows;
};

/**
 * Change the priority of an order
 * @param {number} orderID - order ID
 * @param {string} priority - new priority
 */
const updatePriority = async (orderID, priority) => {
    const results = await pool.query(
        `
        UPDATE customer_order
        SET priority = ${priority}
        WHERE id = ${orderID}
        `
    );

    return results.rows;
};

/**
 * Add an item to existing order
 * @param {Object} data
 * @param {Number} data.order_id - Order ID
 * @param {Number} data.product_id - Product ID
 * @param {Number} data.quantity - Quantity
 * @param {Number} data.price - Product Price
 */
const insertItem = async (data) => {
    const { order_id, product_id, quantity, price } = data;

    await pool.query(
        `
        INSERT INTO order_item
        (order_id, product_id, quantity, price)
        VALUES ($1, $2, $3, $4)
        `,
        [order_id, product_id, quantity, price]
    );
};

/**
 * Create a new package containing products
 * @param {Object} data
 * @param {Number} data.order_id - Order ID
 * @param {Number} data.product_id - Product ID
 * @param {String} data.scan_status - Scan Status Name
 * @param {Number} data.user_id - User ID
 */
const insertPackage = async (data) => {
    const { order_id, product_id, scan_status, user_id } = data;

    await pool.query(
        `
        INSERT INTO order_package
        (order_id, product_id, scan_status, user_id)
        VALUES ($1, $2, $3, $4)
        `,
        [order_id, product_id, scan_status, user_id]
    );
};

/**
 * Update the scan status
 * @param {number} packageID - package ID
 * @param {string} status - new scan status
 */
const updatePackageStatus = async (packageID, status) => {
    await pool.query(
        `
        UPDATE order_package
        SET scan_status = ${status}
        WHERE id = ${packageID}
        `
    );
};

/**
 * Create shipment for an order
 * @param {Object} data
 * @param {Number} data.order_id - Order ID
 * @param {Number} data.driver_id - Driver ID
 * @param {String} data.tracking_number - Tracking number like AWB
 */
const insertShipment = async (data) => {
    const { order_id, driver_id, tracking_number } = data;

    await pool.query(
        `
        INSERT INTO order_package
        (order_id, driver_id, tracking_number)
        VALUES ($1, $2, $3)
        `,
        [order_id, driver_id, tracking_number]
    );
};

module.exports = {
    insert: insertOrder,
    getCustomerOrders,
    updatePriority,
    item: {
        insert: insertItem,
    },
    package: {
        insert: insertPackage,
        updateStatus: updatePackageStatus,
    },
    shipment: {
        insert: insertShipment,
    },
};
