const { Router } = require('express');
const {
    orderController,
    orderItemController,
    orderPackageController,
} = require('../../controllers/v1/orderController');

const orderRouter = Router();

// customer_order
orderRouter.get('/', orderItemController.getAll);
orderRouter.post('/', orderController.add);
orderRouter.put('/:id', orderController.update);
orderRouter.get('/:id', orderController.get);
orderRouter.delete('/:id', orderController.delete);

// order item
orderRouter.get('/:id/items', orderItemController.get);

// order_package
orderRouter.get('/:id/packages', orderPackageController.getAll);
orderRouter.post('/:id/packages/', orderPackageController.add);
orderRouter.get('/:id/packages/:id', orderPackageController.get);
orderRouter.put('/:id/packages/:id', orderPackageController.update);
orderRouter.delete('/:id/packages/:id', orderPackageController.delete);

module.exports = orderRouter;
