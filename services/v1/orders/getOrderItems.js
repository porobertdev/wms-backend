const knex = require('../../../database/pool');

const getOrderItems = async (id) => {
    /*SQL QUERY

    SELECT order_item.product_id, product.name, product.sku, pi.location_id, pi.quantity, bl.location_code FROM order_item INNER JOIN product ON order_item.product_id = product.id AND order_item.order_id = 3345 INNER JOIN product_inventory AS pi ON pi.product_id = product.id INNER JOIN bin_location AS bl ON bl.id = pi.location_id;
    */

    try {
        // Get all product info required for creating Picking Lists
        const products = await knex('order_item')
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
                'product.counter_type',
                'order_item.quantity as order_quantity',
                'pi.location_id',
                'bl.location_code',
                'pi.quantity as location_quantity'
            );

        if (products.length === 0) {
            return { message: `Order ID ${id} was not found` };
        }

        /*
        The products array can contain multiple objects
        representing the same product_id, but having different locations.

        Filter the products so that we end up with an array of
        unique objects, where each object contains a `locations` array.
        */

        // Adam T - Why not just use products.filter here?
        const filtered = [];

        products.forEach((item) => {
            const index = filtered.findIndex(
                (p) => p.product_id === item.product_id
            );

            if (index === -1) {
                filtered.push({
                    product_id: item.product_id,
                    name: item.name,
                    sku: item.sku,
                    counter_type: item.counter_type,
                    order_quantity: item.order_quantity,
                    locations: [
                        {
                            location_id: item.location_id,
                            location_code: item.location_code,
                            location_quantity: item.location_quantity,
                        },
                    ],
                });
            } else {
                filtered[index].locations.push({
                    location_id: item.location_id,
                    location_code: item.location_code,
                    location_quantity: item.location_quantity,
                });
            }
        });

        return {
            order_id: id,
            products: filtered,
        };
    } catch (err) {
        console.error(err);
    }
};

module.exports = getOrderItems;
