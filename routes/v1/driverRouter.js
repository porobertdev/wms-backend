const { Router } = require('express');

const {
    driverController,
    deliveryRouteController,
    routePackageController,
} = require('../../controllers/v1/driverController');

const driverRouter = Router();

// driver
driverRouter.get('/', driverController.getAll);
driverRouter.post('/', driverController.add);
driverRouter.get('/:id', driverController.get);
driverRouter.put('/:id', driverController.update);
driverRouter.delete('/:id', driverController.delete);

// delivery_route
driverRouter.get('/delivery-route', deliveryRouteController.getAll);
driverRouter.post('/delivery-route', deliveryRouteController.add);
driverRouter.get('/delivery-route/:id', deliveryRouteController.get);
driverRouter.put('/delivery-route/:id', deliveryRouteController.update);
driverRouter.delete('/delivery-route/:id', deliveryRouteController.delete);

// route_package
driverRouter.get('/route-packages', routePackageController.getAll);
driverRouter.post('/route-packages', routePackageController.add);
driverRouter.get('/route-packages/:id', routePackageController.get);
driverRouter.put('/route-packages/:id', routePackageController.update);
driverRouter.delete('/route-packages/:id', routePackageController.delete);

module.exports = driverRouter;
