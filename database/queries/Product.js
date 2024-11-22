const pool = require('../pool');

/**
 * Add a new category
 * @param {Object} data
 * @param {String} data.name - name
 */
const insertCategory = async (data) => {
    const { name } = data;

    await pool.query(
        `
        INSERT INTO product_category(name)
        VALUES ($1)
        `,
        [name]
    );
};

/**
 * Delete a product category
 * @param {string} name - category name
 */
const deleteCategory = async (name) => {
    await pool.query(
        `
        DELETE FROM product_category
        WHERE name = ${name}
        `
    );
};

/**
 * Update name of a product category
 * @param {string} name - category name
 */
const updateCategory = async (name) => {
    await pool.query(
        `
        UPDATE product_category
        SET name = ${name}
        `
    );
};

/**
 * Add a new manufacturer
 * @param {Object} data
 * @param {String} data.name - name
 */
const insertManufacturer = async (data) => {
    const { name } = data;

    await pool.query(
        `
        INSERT INTO product_manufacturer(name)
        VALUES ($1)
        `,
        [name]
    );
};

/**
 * Delete a product category
 * @param {string} name - category name
 */
const deleteManufacturer = async (name) => {
    await pool.query(
        `
        DELETE FROM product_manufacturer
        WHERE name = ${name}
        `
    );
};

/**
 * Update name of a product manufacturer
 * @param {string} name - manufacturer name
 */
const updateManufacturer = async (name) => {
    await pool.query(
        `
        UPDATE product_manufacturer
        SET name = ${name}
        `
    );
};

/**
 * Add a new product
 * @param {Object} data
 * @param {String} data.name - Name
 * @param {String} data.sku - SKU Code
 * @param {String} data.description - Description
 * @param {String} data.counter_type - Counting Type for Picking
 * @param {Number} data.width - Width
 * @param {Number} data.height - Height
 * @param {Number} data.weight - Weight
 * @param {Number} data.price - Price
 * @param {Number} data.category_id - Category ID
 * @param {Number} data.manufacturer_id - Manufacturer ID
 */
const insertProduct = async (data) => {
    const {
        name,
        sku,
        description,
        counter_type,
        width,
        height,
        weight,
        price,
        category_id,
        manufacturer_id,
    } = data;

    await pool.query(
        `
        INSERT INTO product
        (name, sku, description, counter_type, width, height, weight, price, category_id, manufacturer_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `,
        [
            name,
            sku,
            description,
            counter_type,
            width,
            height,
            weight,
            price,
            category_id,
            manufacturer_id,
        ]
    );
};

/**
 * Delete a product
 * @param {string} name - category name
 */
const deleteProduct = async (name) => {
    await pool.query(
        `
        DELETE FROM product
        WHERE name = ${name}
        `
    );
};

/**
 * Get SKU/barcode of a product to print a new label
 * @param {number} productID - product ID
 */
const getSKU = async (productID) => {
    const results = await pool.query(
        `
        SELECT sku FROM product
        WHERE product_id = ${productID}
        `
    );

    return results.rows[0];
};

module.exports = {
    category: {
        insert: insertCategory,
        delete: deleteCategory,
        update: updateCategory,
    },
    manufacturer: {
        insert: insertManufacturer,
        delete: deleteManufacturer,
        update: updateManufacturer,
    },
    insert: insertProduct,
    delete: deleteProduct,
    getSKU,
};
