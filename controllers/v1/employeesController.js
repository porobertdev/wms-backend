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
            const result = await employee.delete({
                id: employee_id,
                tableName: employee.tableName,
            });

            let json;

            if (result) {
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
    update: async (req, res, next) => {
        try {
            const { employee_id } = req.params;
            const payload = req.body;

            const result = await employee.update({
                tableName: 'employee',
                id: employee_id,
                payload,
            });

            if (result) {
                res.json({
                    success: true,
                    message: 'Employee data has been updated.',
                });
            } else {
                res.json({
                    success: false,
                    message: 'Something went wrong.',
                });
            }
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
            const results = await employee.getEmployeeByWarehouse(warehouse_id);

            res.json({
                success: true,
                employees: results,
            });
        } catch (err) {
            next(err);
        }
    },
};
