const EventEmitter = require('events');
// const queueWorker = require('../workers/v1/queueWorker');
const queueEmitter = new EventEmitter();

/* queueEmitter.on('taskAdded', async (type) => {
    // const queueService = require('../services/v1/queueService');
    // const task = await queueService.getNextTask(type);
    await queueWorker.processQueue(type);
}); */

module.exports = queueEmitter;
