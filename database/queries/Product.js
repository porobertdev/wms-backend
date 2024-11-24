const pool = require('../pool');

/**
 * Get category name
 * @param {Number} id - Category ID
 */
const getCategory = async (id) => {
    const results = await pool.query(
        `
        SELECT * FROM product_category
        WHERE id = ${id}
        `
    );
    return results.rows[0];
};

/**
 * Add a new category
 * @param {String} name - name
 */
const insertCategory = async (name) => {
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
 * @param {Number} id - Category ID
 */
const deleteCategory = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM product_category
        WHERE id = ${id}
        `
    );

    return result.rowCount === 1 ? true : false;
};

/**
 * Update name of a product category
 * @param {string} name - category name
 * @param {Number} id - Category ID
 */
const updateCategory = async (name, id) => {
    await pool.query(
        `
        UPDATE product_category
        SET name = '${name}'
        WHERE id = ${id}
        `
    );
};

/**
 * Get Manufacturer name
 * @param {Number} id - Manufacturer ID
 */
const getManufacturer = async (id) => {
    const results = await pool.query(
        `
        SELECT * FROM product_manufacturer
        WHERE id = ${id}
        `
    );

    return results.rows[0];
};

/**
 * Add a new manufacturer
 * @param {String} name - name
 */
const insertManufacturer = async (name) => {
    await pool.query(
        `
        INSERT INTO product_manufacturer(name)
        VALUES ($1)
        `,
        [name]
    );
};

/**
 * Delete a product manufacturer
 * @param {Number} id - category ID
 */
const deleteManufacturer = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM product_manufacturer
        WHERE id = ${id}
        `
    );

    return result.rowCount === 1 ? true : false;
};

/**
 * Update name of a product manufacturer
 * @param {string} name - name
 * @param {Number} id - Category ID
 */
const updateManufacturer = async (name, id) => {
    await pool.query(
        `
        UPDATE product_manufacturer
        SET name = '${name}'
        WHERE id = ${id}
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
 * @param {string} id - Product ID
 */
const deleteProduct = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM product
        WHERE id = ${id}
        `
    );
    return result.rowCount === 1 ? true : false;
};

/**
 * Get all info of a product by ID
 * @param {number} productID - product ID
 */
const getProductByID = async (productID) => {
    const results = await pool.query(
        `
        SELECT * FROM product
        WHERE id = ${productID}
        `
    );

    return results.rows[0];
};

/**
 * Update any table fields dynamically
 * @param {Object} data
 * @param {String} data.tableName - Table name
 * @param {Object} data.payload - Payload containing key-value pairs for column-rows
 * @returns {Boolean} - True/false based on updating success
 */
const update = async (data) => {
    const { tableName, id, payload } = data;
    const query = `
        UPDATE ${tableName}
        SET ${Object.keys(payload)
            .map((key) => `${key} = '${payload[key]}'`)
            .join(', ')}
        WHERE id = ${id}
        `;
    const result = await pool.query(query);

    return result.rowCount === 1 ? true : false;
};

module.exports = {
    category: {
        get: getCategory,
        insert: insertCategory,
        delete: deleteCategory,
        update: updateCategory,
    },
    manufacturer: {
        get: getManufacturer,
        insert: insertManufacturer,
        delete: deleteManufacturer,
        update: updateManufacturer,
    },
    insert: insertProduct,
    delete: deleteProduct,
    get: getProductByID,
    update,
};
