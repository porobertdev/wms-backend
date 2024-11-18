const pool = require('../pool');

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

module.exports = {
    insertCategory,
    insertManufacturer,
    insertProduct,
};
