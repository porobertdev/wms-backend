const { Router } = require('express');
const employeesController = require('../../controllers/v1/employeesController');

const employeesRouter = Router();

/* NOTICE:

Initially, I had different routes that used
updateWarehouse, updateSalary, and getSalary
respectively.

It turns out a better way to do that is simply
using the same endpoint e.g. /:employee_id, and
passing payload to req.body so that we can update
any field in the table with one endpoint.

That is easier to maintain since we need
less endpoints and SQL queries.
*/
employeesRouter.get('/', employeesController.get);
employeesRouter.post('/', employeesController.add);
// :employee_id
employeesRouter.get('/:employee_id', employeesController.getEmployeeByID);
employeesRouter.put('/:employee_id', employeesController.update);
employeesRouter.delete('/:employee_id', employeesController.delete);
// warehouse
employeesRouter.get(
    '/warehouse/:warehouse_id',
    employeesController.getWarehouseEmployees
);

module.exports = employeesRouter;
