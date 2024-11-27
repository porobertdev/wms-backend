const crudController = require('./crudController');

const driverController = crudController('driver');
const deliveryRouteController = crudController('delivery_route');
const routePackageController = crudController('route_package');

// TODO: break up the foreign tables since it needs different name
module.exports = {
    driverController,
    deliveryRouteController,
    routePackageController,
};
