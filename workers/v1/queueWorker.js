const queueEmitter = require('../../events/queueEmitter');
const queueService = require('../../services/v1/queueService');
const orderService = require('../../services/v1/orders/orderService');
const pickingService = require('../../services/v1/picking/pickingService');

const processQueue = async (type) => {
    const task = await queueService.getNextTask(type);

    if (!task) {
        console.log('[QUEUE WORKER] - No tasks in queue. Waiting...');
        return;
    }

    const { id, task_data } = task;

    try {
        console.log(`[QUEUE WORKER] - Processing task: ${type} (ID: ${id})`);

        if (type === 'order') {
            await orderService.processOrder(
                task_data.order_id,
                task_data.products
            );
        } else if (type === 'picking_list') {
            // or maybe pickingService.delegate(workerID)
            await pickingService.processPickingList(
                task_data.order_id,
                task_data.products
            );
        }

        // update task status
        await queueService.completeTask(id);
    } catch (err) {
        console.error(
            `[QUEUE WORKER] - Error processing task ${id}:`,
            err.message
        );
        await queueService.failTask(id);
    }
};

queueEmitter.on('taskAdded', async (type) => {
    await processQueue(type);
});

module.exports = { processQueue };
