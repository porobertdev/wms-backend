const { Router } = require('express');
const employeesController = require('../../controllers/v1/employeesController');

const employeesRouter = Router();

employeesRouter.get('/', employeesController.getAllEmployees);
employeesRouter.post('/', employeesController.add);

employeesRouter.get('/:employee_id', employeesController.getEmployeeByID);
employeesRouter.delete('/:employee_id', employeesController.delete);
employeesRouter.get(
    '/warehouse/:warehouse_id',
    employeesController.getWarehouseEmployees
);
employeesRouter.put(
    '/:employee_id/warehouse',
    employeesController.updateWarehouse
);
// salary
employeesRouter.get('/:employee_id/salary', employeesController.getSalary);
employeesRouter.put('/:employee_id/salary', employeesController.updateSalary);
module.exports = employeesRouter;
