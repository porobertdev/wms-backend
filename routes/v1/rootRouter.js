const { Router } = require('express');
const rootController = require('../../controllers/v1/rootController');
const warehouseRouter = require('./warehouseRouter');
const personRouter = require('./personRouter');
const rolesRouter = require('./rolesRouter');
const employeesRouter = require('./employeesRouter');
const usersRouter = require('./usersRouter');
const customersRouter = require('./customersRouter');
const productsRouter = require('./productsRouter');
const inventoryRouter = require('./inventoryRouter');
const orderRouter = require('./orderRouter');

const rootRouter = Router();

rootRouter.get('/', rootController.get);
rootRouter.use('/warehouses', warehouseRouter);
rootRouter.use('/persons', personRouter);
rootRouter.use('/roles', rolesRouter);
rootRouter.use('/employees', employeesRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/customers', customersRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/inventory', inventoryRouter);
rootRouter.use('/orders', orderRouter);

module.exports = { rootRouter };
