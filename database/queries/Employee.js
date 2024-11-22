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
 * Transfer employee to another warehouse
 * @param {Object} data
 * @param {Number} data.employeeID - Employee ID
 * @param {Number} data.warehouseID - Warehouse ID
 * @returns {any}
 */
const changeWarehouse = async (data) => {
    const { employeeID, warehouseID } = data;

    await pool.query(
        `
        UPDATE employee
        SET warehouse_id = ${warehouseID}
        WHERE id = ${employeeID}
        `
    );
};

/**
 * Update salary
 * @param {number} employeeID - ID of the person
 * @param {number} salary - The new salary
 */
const updateSalary = async (employeeID, salary) => {
    await pool.query(
        `
        UPDATE employee
        SET salary = ${salary}
        WHERE id = ${employeeID}
        `
    );
};

module.exports = {
    insert,
    delete: deleteEmployee,
    changeWarehouse,
    updateSalary,
};
