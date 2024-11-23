const { Router } = require('express');
const rootController = require('../../controllers/v1/rootController');
const warehouseRouter = require('./warehouseRouter');
const personRouter = require('./personRouter');
const rolesRouter = require('./rolesRouter');
const employeesRouter = require('./employeesRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customersRouter');

const rootRouter = Router();

rootRouter.get('/', rootController.get);
rootRouter.use('/warehouses', warehouseRouter);
rootRouter.use('/persons', personRouter);
rootRouter.use('/roles', rolesRouter);
rootRouter.use('/employees', employeesRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/customers', customersRouter);

module.exports = { rootRouter };
