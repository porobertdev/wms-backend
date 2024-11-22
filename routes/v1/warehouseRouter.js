const { Router } = require('express');
const warehouseController = require('../../controllers/v1/warehouseController');

const warehouseRouter = Router();

warehouseRouter.post('/', warehouseController.createWarehouse);
warehouseRouter.post(
    '/:warehouse/locations',
    warehouseController.createBinLocation
);

module.exports = warehouseRouter;
