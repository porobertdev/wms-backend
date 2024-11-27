const { Router } = require('express');
const {
    warehouseController,
    binLocationController,
} = require('../../controllers/v1/warehouseController');

const warehouseRouter = Router();

// warehouse
warehouseRouter.get('/', warehouseController.getAll);
warehouseRouter.post('/', warehouseController.add);
warehouseRouter.get('/:id', warehouseController.get);
warehouseRouter.put('/', warehouseController.update);
warehouseRouter.delete('/:id', warehouseController.delete);

// bin location
warehouseRouter.get('/:id/locations', binLocationController.getAll);
warehouseRouter.post('/:id/locations', binLocationController.add);
warehouseRouter.put('/:id/locations/:id', binLocationController.update);
warehouseRouter.delete('/:id/locations/:id', binLocationController.delete);

module.exports = warehouseRouter;
