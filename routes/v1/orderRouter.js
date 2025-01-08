const { Router } = require('express');
const {
    orderController,
    orderItemController,
    orderPackageController,
} = require('../../controllers/v1/orderController');

const orderRouter = Router();

// customer_order
orderRouter.get('/all', orderController.getAll);
orderRouter.post('/', orderController.add, orderController.processOrder);
orderRouter.put('/:id', orderController.update);
// query to get customer's orders
orderRouter.get('/', orderController.get);
orderRouter.get('/:id', orderController.get);
orderRouter.delete('/:id', orderController.delete);

// order item
orderRouter.get('/:id/items', orderItemController.getOrderItems);

// order_package
orderRouter.get('/:id/packages', orderPackageController.getAll);
orderRouter.post('/:id/packages/', orderPackageController.add);
orderRouter.get('/:id/packages/:id', orderPackageController.get);
orderRouter.put('/:id/packages/:id', orderPackageController.update);
orderRouter.delete('/:id/packages/:id', orderPackageController.delete);

module.exports = orderRouter;
