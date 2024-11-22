const pool = require('../pool');

/**
 * Description
 * @param {Object} data
 * @param {Number} data.product_id - Product ID
 * @param {Number} data.location_id - Bin Location ID
 * @param {Number} data.quantity_change - New quantity
 * @param {String} data.transaction_type - Transaction name
 * @param {Number} data.user_id - User ID
 */
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

/**
 * Delete a transaction
 * @param {number} roleID - user_role table
 * @param {number} permissionID - permissions table
 */
const deleteTransaction = async (transactionID) => {
    await pool.query(
        `
        DELETE FROM inventory_transaction
        WHERE id = ${transactionID}
        `
    );
};

/**
 * Return all transactions made on a product
 * @param {number} productID - product ID
 */
const getProductTransactions = async (productID) => {
    const results = await pool.query(
        `
        SELECT * FROM inventory_transaction
        WHERE product_id = ${productID}
        `
    );

    return results.rows;
};

/**
 * Return all transactions made by a specific user
 * @param {number} userID - user ID
 */
const getUserTransactions = async (userID) => {
    const results = await pool.query(
        `
        SELECT * FROM inventory_transaction
        WHERE user_id = ${userID}
        `
    );

    return results.rows;
};

/**
 * Add a product to a location
 * @param {object} data - product_id, warehouse_id, location_id, quantity
 */
const insertProduct = async (data) => {
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

/**
 * Get all locations where a product is stored for a specific warehouse
 * @param {number} productID - product ID
 * @param {number} warehouseID - warehouse ID
 */
const getProductLocation = async (productID, warehouseID) => {
    const results = await pool.query(
        `
        SELECT * FROM product_inventory
        WHERE product_id = ${productID} AND warehouse_id = ${warehouseID}
        `
    );

    return results.rows;
};

/**
 * Change the location of a product. NO need to mention location_id and warehouse_id since we target the row id
 * @param {number} id - the row's id from product_inventory that holds the product
 * @param {number} warehouseID - warehouse ID
 * @param {number} locationID - the new location
 */
const updateProductLocation = async (id, warehouseID, locationID) => {
    await pool.query(
        `
        UPDATE product_inventory
        SET location_id = ${locationID}
        WHERE id = ${id} AND warehouse_id = ${warehouseID}
        `
    );
};

/**
 * Update product quantity for a location in a warehouse. NO need to mention location_id and warehouse_id since we target the row id
 * @param {number} id - the row's id from product_inventory that holds the product
 * @param {number} locationID - the new location
 */
const updateProductQuantity = async (id, quantity) => {
    await pool.query(
        `
        UPDATE product_inventory
        SET quantity = ${quantity}
        WHERE id = ${id}
        `
    );
};

/**
 * Get a list of all products from a specific location and warehouse aka 'stoc locatie' in Autonet
 * @param {number} productID - product ID
 * @param {number} warehouseID - warehouse ID
 */
const getProductList = async (warehouseID, locationID) => {
    const results = await pool.query(
        `
        SELECT product_id FROM product_inventory
        WHERE warehouse_id = ${warehouseID} AND location_id = ${locationID}
        `
    );

    return results.rows;
};

module.exports = {
    product: {
        insert: insertProduct,
        getLocation: getProductLocation,
        getList: getProductList,
        updateLocation: updateProductLocation,
        updateQuantity: updateProductQuantity,
    },
    transaction: {
        insert: insertTransaction,
        delete: deleteTransaction,
        getProductTransactions,
        getUserTransactions,
    },
};
