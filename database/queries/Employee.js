const { insert, update, deleteRow } = require('../db');
const pool = require('../pool');
const tableName = 'employee';

/**
 * Add an employee
 * @param {Object} data
 * @param {Number} data.person_id - Person ID from persons table
 * @param {Number} data.warehouse_id - Warehouse ID from warehouse table
 * @param {Number} data.role_id - Role ID from user_role table
 * @param {Number} data.salary - Salary
 */
const insert = async (data) => {
    const { person_id, warehouse_id, role_id, salary } = data;

    await pool.query(
        `
        INSERT INTO employee
        (person_id, warehouse_id, role_id, salary)
        VALUES ($1, $2, $3, $4)
        `,
        [person_id, warehouse_id, role_id, salary]
    );
};

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
    insert,
    update,
    delete: deleteRow,
    getAllEmployees,
    getEmployeeByID,
    getEmployeeByWarehouse,
};
