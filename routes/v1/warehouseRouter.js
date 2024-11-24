const { Router } = require('express');
const warehouseController = require('../../controllers/v1/warehouseController');

const warehouseRouter = Router();

// warehouse
warehouseRouter.get('/', warehouseController.getAll);
warehouseRouter.post('/', warehouseController.add);
warehouseRouter.get('/:id', warehouseController.get);
warehouseRouter.put('/', warehouseController.update);
warehouseRouter.delete('/:id', warehouseController.delete);

// bin location
warehouseRouter.get('/:id/locations', warehouseController.binLocation.getAll);
warehouseRouter.post('/:id/locations', warehouseController.binLocation.add);
warehouseRouter.put(
    '/:id/locations/:id',
    warehouseController.binLocation.update
);
warehouseRouter.delete(
    '/:id/locations/:id',
    warehouseController.binLocation.delete
);

module.exports = warehouseRouter;
