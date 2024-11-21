const pool = require('../pool');

const insert = async (data) => {
    const { id, warehouse_id, role_id, salary } = data;

    await pool.query(
        `
        INSERT INTO employee
        (id, warehouse_id, role_id, salary)
        VALUES ($1, $2, $3, $4)
        `,
        [id, warehouse_id, role_id, salary]
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

const changeWarehouse = async (employeeID, warehouseID) => {
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
