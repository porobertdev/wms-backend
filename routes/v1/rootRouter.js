const { Router } = require('express');
const rootController = require('../../controllers/v1/rootController');
const warehouseRouter = require('./warehouseRouter');
const personRouter = require('./personRouter');

const rootRouter = Router();

rootRouter.get('/', rootController.get);
rootRouter.use('/warehouses', warehouseRouter);

module.exports = { rootRouter };
