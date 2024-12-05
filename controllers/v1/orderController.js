const { crud } = require('../../database/db');
const knex = require('../../database/pool');
const queueService = require('../../services/v1/queueService');
const crudController = require('./crudController');

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
        // const results = await crud.get('order_item', { order_id: id });

        /*SQL QUERY

        SELECT order_item.product_id, product.name, product.sku, pi.location_id, pi.quantity, bl.location_code FROM order_item INNER JOIN product ON order_item.product_id = product.id AND order_item.order_id = 3345 INNER JOIN product_inventory AS pi ON pi.product_id = product.id INNER JOIN bin_location AS bl ON bl.id = pi.location_id;
        */

        // Get all product info required for creating Picking Lists
        const results = await knex('order_item')
            .innerJoin('product', function () {
                this.on('order_item.product_id', '=', 'product.id').andOn(
                    'order_item.order_id',
                    '=',
                    knex.raw('?', [id])
                );
            })
            .innerJoin('product_inventory as pi', 'pi.product_id', 'product.id')
            .innerJoin('bin_location as bl', 'bl.id', 'pi.location_id')
            .select(
                'order_item.product_id',
                'product.name',
                'product.sku',
                'order_item.quantity as order_quantity',
                'pi.location_id',
                'bl.location_code',
                'pi.quantity as location_quantity'
            );

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
