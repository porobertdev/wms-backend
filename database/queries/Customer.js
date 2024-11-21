const pool = require('../pool');

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
 * @param {number} personID - person's ID from 'persons' table
 */
const deleteCustomer = async (personID) => {
    await pool.query(
        `
        DELETE FROM customer
        WHERE person_id = ${personID}
        `
    );
};

module.exports = {
    insert: insertCustomer,
    delete: deleteCustomer,
};
