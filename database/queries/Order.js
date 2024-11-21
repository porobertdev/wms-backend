const pool = require('../pool');

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
