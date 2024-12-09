const { crud } = require('../../../database/db');

/**
 * Process a picking list
 * @param {Number} orderID - Order ID
 * @param {Array} products - products to pick
 * @returns {any}
 */
const processPickingList = async (orderID, products) => {
    // filter the products based on warehouse sector
    const sectors = {};

    products.forEach((p) => {
        const whSector = p.warehouse_sector;

        if (!sectors[whSector]) {
            sectors[whSector] = [];
        }

        sectors[whSector].push(p);
    });

    const results = await crud.add(
        'picking_list',
        Object.keys(sectors).map((s) => {
            return {
                warehouse_sector: s,
                order_id: orderID,
                products: JSON.stringify(sectors[s]),
            };
        })
    );

    console.log('🚀 ~ processPickingList ~ results:', results);
};

module.exports = processPickingList;
