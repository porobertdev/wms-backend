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
    insertOrder,
    insertItem,
    insertPackage,
    insertShipment,
};
