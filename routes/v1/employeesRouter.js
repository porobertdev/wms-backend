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
employeesRouter.get('/', employeesController.getAll);
employeesRouter.post('/', employeesController.add);
// :employee_id
employeesRouter.get('/:id', employeesController.get);
employeesRouter.put('/:id', employeesController.update);
employeesRouter.delete('/:id', employeesController.delete);
// warehouse
employeesRouter.get('/warehouse/:id', employeesController.get);

module.exports = employeesRouter;
