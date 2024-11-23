const { get, insert, update, deleteRow } = require('../queries/Dynamic');
const pool = require('../pool');
const tableName = 'employee';

/**
 * Get a list of all employees
 * @returns {Array}
 */
const getAllEmployees = async () => {
    const results = await pool.query(`
        SELECT * FROM employee
        `);

    return results.rows;
};

/**
 * Get a list of all employees
 * @returns {Array}
 */
const getEmployeeByID = async (id) => {
    const results = await pool.query(`
        SELECT * FROM employee
        WHERE id = ${id}
        `);

    return results.rows[0];
};

/**
 * Get a list of all employees
 * @param {Object} data
 * @param {Number} data.warehouse_id - Warehouse ID
 * @returns {Array}
 */
const getEmployeeByWarehouse = async (warehouse_id) => {
    const results = await pool.query(`
        SELECT * FROM employee
        WHERE warehouse_id = ${warehouse_id}
        `);

    return results.rows;
};

module.exports = {
    tableName,
    get,
    insert,
    update,
    delete: deleteRow,
    getAllEmployees,
    getEmployeeByID,
    getEmployeeByWarehouse,
};
