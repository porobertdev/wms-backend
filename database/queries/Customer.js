const pool = require('../pool');

/**
 * Get a list of all employees
 * @returns {Array}
 */
const getCustomerByID = async (id) => {
    const results = await pool.query(`
        SELECT * FROM customer
        WHERE id = ${id}
        `);

    return results.rows[0];
};

/**
 * Add a new customer
 * @param {Object} data
 * @param {String} data.type - Customer Type: business: pfa/srl, private
 * @param {Number} person_id - Person ID from persons table
 */
const insertCustomer = async (data) => {
    const { type, person_id } = data;

    await pool.query(
        `
        INSERT INTO customer
        (type, person_id)
        VALUES ($1, $2)
        `,
        [type, person_id]
    );
};

/**
 * Delete a customer
 * @param {number} customerID - Customer ID
 */
const deleteCustomer = async (customerID) => {
    const result = await pool.query(
        `
        DELETE FROM customer
        WHERE id = ${customerID}
        `
    );

    return result.rowCount === 1 ? true : false;
};

module.exports = {
    get: getCustomerByID,
    insert: insertCustomer,
    delete: deleteCustomer,
};
