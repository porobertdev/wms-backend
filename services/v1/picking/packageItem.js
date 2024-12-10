const { crud } = require('../../../database/db');

/**
 * Package an item
 * @param {Array} item -
 * @returns {any}
 */
const packageItem = async (pick_id, product_id) => {
    // Or maybe take an array.
    // TODO: check if it's the last item on frontend, then run `completePickingList`

    try {
        await crud.update('picked_items', {
            data: {
                picking_status: 'packaged',
            },
            where: {
                pick_id,
                product_id,
            },
        });
    } catch (err) {
        console.error(`[PICKING] - Failed to package item(s)`, err.message);
    }
};

module.exports = packageItem;
