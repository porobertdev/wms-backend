const pool = require('../pool');

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
const deleteEmployee = async (employeeID) => {
    await pool.query(
        `
        DELETE FROM employee
        WHERE id = ${employeeID}
        `
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
const getWarehouseEmployees = async (data) => {
    const { warehouse_id } = data;

    const results = await pool.query(`
        SELECT * FROM employee
        WHERE warehouse_id = ${warehouse_id}
        `);

    return results.rows;
};

/**
 * Transfer employee to another warehouse
 * @param {Object} data
 * @param {Number} data.employeeID - Employee ID
 * @param {Number} data.warehouseID - Warehouse ID
 * @returns {any}
 */
const changeWarehouse = async (data) => {
    const { employee_id, warehouse_id } = data;

    await pool.query(
        `
        UPDATE employee
        SET warehouse_id = ${warehouse_id}
        WHERE id = ${employee_id}
        `
    );
};

/**
 * Update salary of an employee
 * @param {number} employeeID - ID of the person
 * @param {number} salary - The new salary
 */
const updateSalary = async (data) => {
    const { employee_id, salary } = data;
    await pool.query(
        `
        UPDATE employee
        SET salary = ${salary}
        WHERE id = ${employee_id}
        `
    );
};

/**
 * Get salary of an employee
 * @param {any} id
 * @returns {any}
 */
const getSalary = async (id) => {
    const results = await pool.query(`
        SELECT * FROM employee
        WHERE id = ${id}
        `);

    return results.rows[0].salary;
};

module.exports = {
    insert,
    delete: deleteEmployee,
    changeWarehouse,
    salary: {
        get: getSalary,
        update: updateSalary,
    },
    getAllEmployees,
    getEmployeeByID,
    getWarehouseEmployees,
};
