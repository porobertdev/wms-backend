const knex = require('../../../database/pool');

const getOrderItems = async (id) => {
    /*SQL QUERY

    SELECT order_item.product_id, product.name, product.sku, pi.location_id, pi.quantity, bl.location_code FROM order_item INNER JOIN product ON order_item.product_id = product.id AND order_item.order_id = 3345 INNER JOIN product_inventory AS pi ON pi.product_id = product.id INNER JOIN bin_location AS bl ON bl.id = pi.location_id;
    */

    try {
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

        if (results.length === 0) {
            return { message: `Order ID ${id} was not found` };
        }

        return results;
    } catch (err) {
        console.error(err);
    }
};

module.exports = getOrderItems;
