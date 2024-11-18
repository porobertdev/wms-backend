const pool = require('../pool');

const insertTransaction = async (data) => {
    const {
        product_id,
        location_id,
        quantity_change,
        transaction_type,
        user_id,
    } = data;

    await pool.query(
        `
        INSERT INTO inventory_transaction
        (product_id,
        location_id,
        quantity_change,
        transaction_type,
        user_id)
        VALUES ($1, $2, $3, $4, $5)
        `,
        [product_id, location_id, quantity_change, transaction_type, user_id]
    );
};

const insertProductInventory = async (data) => {
    const { product_id, warehouse_id, location_id, quantity } = data;

    await pool.query(
        `
        INSERT INTO product_inventory
        (product_id, warehouse_id, location_id, quantity)
        VALUES ($1, $2, $3, $4)
        `,
        [product_id, warehouse_id, location_id, quantity]
    );
};

module.exports = {
    insertTransaction,
    insertProductInventory,
};
