const getAvailableWorkers = require('./getAvailableWorkers');
const getRandomNumber = require('../../../utils/getRandomNumber');
const knex = require('../../../database/pool');
const { crud } = require('../../../database/db');

const getNextPickingList = async () => {
    try {
        const list = await knex('picking_list')
            .where({
                worker_id: null,
                picking_status: 'pending',
            })
            .orderBy('created_at', 'asc')
            .first();

        // null if there's no more free picking lists
        return list || null;
    } catch (err) {
        console.error(
            '[DELEGATE PICKING] - Error fetching next picking list.',
            err.message
        );
    }
};

// only auto-delegate is supported now
const delegatePickingList = async () => {
    try {
        const workers = await getAvailableWorkers();

        if (workers.length === 0) {
            return {
                message:
                    '[DELEGATE PICKING] - No workers available for picking at this moment.',
            };
        }

        // pick random worker
        const randomWorker = workers[getRandomNumber(0, workers.length - 1)];
        const pickingList = await getNextPickingList();

        // assign picking list to the worker
        await crud.update('picking_list', {
            data: {
                worker_id: randomWorker.user_id,
                picking_status: 'assigned',
            },
            where: {
                id: pickingList.id,
            },
        });

        // TODO: send notification or send request to scanner (frontend) to display picking mode
    } catch (err) {
        console.error(
            '[DELEGATE PICKING] - Failed to delegate work.',
            err.message
        );
    }
};

module.exports = delegatePickingList;
