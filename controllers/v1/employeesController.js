const { employee } = require('../../database/db');
module.exports = {
    add: async (req, res, next) => {
        try {
            const { person_id, warehouse_id, role_id, salary } = req.body;

            await employee.insert({ person_id, warehouse_id, role_id, salary });

            res.json({
                success: true,
                payload: req.body,
                message: 'The employee has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { employee_id } = req.params;
            const result = await employee.delete(employee_id);

            let json;

            if (result.rowCount === 1) {
                json = {
                    success: true,
                    message: 'Employee has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "Employee doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
    getAllEmployees: async (req, res, next) => {
        try {
            const results = await employee.getAllEmployees();

            res.json({
                success: true,
                employees: results,
            });
        } catch (err) {
            next(err);
        }
    },
    getEmployeeByID: async (req, res, next) => {
        try {
            const { employee_id } = req.params;
            const results = await employee.getEmployeeByID(employee_id);

            res.json({
                success: true,
                employees: results,
            });
        } catch (err) {
            next(err);
        }
    },
    getWarehouseEmployees: async (req, res, next) => {
        try {
            const { warehouse_id } = req.params;
            console.log(
                '🚀 ~ getWarehouseEmployees: ~ warehouse_id:',
                warehouse_id
            );

            const results = await employee.getWarehouseEmployees({
                warehouse_id,
            });

            res.json({
                success: true,
                employees: results,
            });
        } catch (err) {
            next(err);
        }
    },
    updateWarehouse: async (req, res, next) => {
        try {
            const { employee_id } = req.params;
            const { warehouse_id } = req.body;
            await employee.changeWarehouse({ employee_id, warehouse_id });

            res.json({
                success: true,
                message: 'Employee has been transfered to another warehouse.',
            });
        } catch (err) {
            next(err);
        }
    },
    getSalary: async (req, res, next) => {
        try {
            const { employee_id } = req.params;
            const salary = await employee.salary.get(employee_id);

            res.json({
                success: true,
                employee_id,
                salary,
            });
        } catch (err) {
            next(err);
        }
    },
    updateSalary: async (req, res, next) => {
        try {
            const { employee_id } = req.params;
            const { salary } = req.body;

            await employee.salary.update({ employee_id, salary });

            res.json({
                success: true,
                message: 'Salary of employee has been updated.',
            });
        } catch (err) {
            next(err);
        }
    },
};
