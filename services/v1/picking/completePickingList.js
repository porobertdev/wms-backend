const { crud } = require('../../../database/db');

const completePickingList = async (pick_id) => {
    try {
        await crud.update('picking_list', {
            data: {
                picking_status: 'completed',
            },
            where: {
                id: pick_id,
            },
        });
    } catch (err) {
        console.log(
            `[PICKING] - Failed to complete picking list ${pick_id}`,
            err.message
        );
    }
};

module.exports = completePickingList;
