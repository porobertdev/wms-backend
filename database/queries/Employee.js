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
 * Delete an employee
 * @param {number} employeeID - ID of the employee
 */
const deleteEmployee = async (data) => {
    const { tableName, id } = data;
    const query = `
        DELETE FROM ${tableName}
        WHERE id = ${id}
        `;
    const result = await pool.query(query);

    return result.rowCount === 1 ? true : false;
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
            .map((key) => `${key} = ${payload[key]}`)
            .join(', ')}
        WHERE id = ${id}
        `;
    const result = await pool.query(query);

    return result.rowCount === 1 ? true : false;
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
    delete: deleteEmployee,
    update,
    getAllEmployees,
    getEmployeeByID,
    getEmployeeByWarehouse,
};
