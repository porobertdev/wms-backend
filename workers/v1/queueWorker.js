const queueEmitter = require('../../events/queueEmitter');
const queueService = require('../../services/v1/queueService');

const processQueue = async (type) => {
    const task = await queueService.getNextTask(type);

    if (!task) {
        console.log('[QUEUE WORKER] - No tasks in queue. Waiting...');
        return;
    }

    try {
        console.log(
            `[QUEUE WORKER] - Processing task: ${task.type} (ID: ${task.id})`
        );
        await queueService.completeTask(task.id);
    } catch (err) {
        console.error(
            `[QUEUE WORKER] - Error processing task ${task.id}:`,
            err.message
        );
        await queueService.failTask(task.id);
    }
};

queueEmitter.on('taskAdded', async (type) => {
    await processQueue(type);
});

module.exports = { processQueue };
