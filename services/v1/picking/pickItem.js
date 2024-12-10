const { crud } = require('../../../database/db');

/**
 * Set an item's status to 'picked' once scanned
 * @param {Number} pick_id - picking_list ID
 * @param {Number} product_id - product ID
 * @returns {any}
 */
const pickItem = async (pick_id, product_id) => {
    try {
        await crud.update('picked_items', {
            data: {
                picking_status: 'picked',
            },
            where: {
                pick_id,
                product_id,
            },
        });
    } catch (err) {
        console.error(
            `[PICKING] - Failed to pick item - product_id ${product_id}`,
            err.message
        );
    }
};

module.exports = pickItem;
