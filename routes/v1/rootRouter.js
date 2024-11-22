const { Router } = require('express');
const rootController = require('../../controllers/v1/rootController');
const warehouseRouter = require('./warehouseRouter');
const personRouter = require('./personRouter');
const rolesRouter = require('./rolesRouter');

const rootRouter = Router();

rootRouter.get('/', rootController.get);
rootRouter.use('/warehouses', warehouseRouter);
rootRouter.use('/persons', personRouter);
rootRouter.use('/roles', rolesRouter);

module.exports = { rootRouter };
