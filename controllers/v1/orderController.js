const { crud } = require('../../database/db');
const crudController = require('./crudController');
const queueService = require('../../services/v1/queueService');
const orderService = require('../../services/v1/orders/orderService');

const orderController = crudController('customer_order');
const orderItemController = crudController('order_item');
const orderPackageController = crudController('order_package');

const addOrderItems = async (req, res, next) => {
    // order_id
    const order_id = req.params.id;

    // TODO: use req.body which holds array passed from frontend
    const mockCartItems = [
        {
            order_id,
            product_id: 50,
            quantity: 20,
            price: 250,
        },
        {
            order_id,
            product_id: 130,
            quantity: 12,
            price: 500,
        },
        { order_id, product_id: 500, quantity: 40, price: 50 },
    ];

    try {
        const results = await crud.add('order_item', mockCartItems);

        // add order into the queue
        await queueService.addTask('order', mockCartItems[0]);

        res.status(201).json({
            message: 'Products added to order_items',
            results,
        });
    } catch (err) {
        next(err);
    }
};

// TODO: make crudController.get more dynamic to handler order_id
const getOrderItems = async (req, res, next) => {
    try {
        const { id } = req.params;
        const results = await orderService.getOrderItems(id);

        res.status(200).json(results);
    } catch (err) {
        next(err);
    }
};

orderItemController.addOrderItems = addOrderItems;
orderItemController.getOrderItems = getOrderItems;

// TODO: break up the foreign tables since it needs different name
module.exports = {
    orderController,
    orderItemController,
    orderPackageController,
};
