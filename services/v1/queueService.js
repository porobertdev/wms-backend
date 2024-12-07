const { crud } = require('../../database/db');
const knex = require('../../database/pool');
const queueEmitter = require('../../events/queueEmitter');

const tableName = 'task_queue';

/**
 * Add (enqueue) a new task into the queue
 * @param {String} type - Type of task: order, picking etc.
 * @param {Object} data - Object with key-value pairs which is stringified
 * @returns {Array} - all values that were inserted
 */
const addTask = async (type, data) => {
    try {
        const task = await knex(tableName)
            .insert({
                type,
                task_data: JSON.stringify(data),
            })
            .returning('*');

        queueEmitter.emit('taskAdded', type);

        return task;
    } catch (err) {
        console.error(
            '[QUEUE SERVICE] - Error adding task to queue:',
            err.message
        );
    }
};

/**
 * Get (dequeue) the next task (FIFO)
 * @param {String} type - Type of task: order, picking etc.
 * @returns {Array} - the found row containing all the values
 */
const getNextTask = async (type) => {
    try {
        /* const task = await crud
            .get(tableName, { type, status: 'pending' })
            .orderBy('created_at', 'asc') // FIFO order
            .first(); */
        const task = await knex(tableName)
            .where({
                type,
                task_status: 'pending',
            })
            .orderBy('created_at', 'asc')
            .first();

        // null if there's no more tasks of that type
        return task || null;
    } catch (err) {
        console.error(
            '[QUEUE SERVICE] - Error fetching next task from queue:',
            err.message
        );
    }
};

/**
 * Mark a task from the queue as completed
 * @param {Number} taskID - ID of the task
 * @returns {Promise<void>}
 */
const completeTask = async (taskID) => {
    try {
        const result = await crud.update(tableName, {
            data: { task_status: 'completed', updated_at: new Date() },
            where: { id: taskID },
        });

        if (result) {
            // TODO: notify the frontend dashboard
            console.log(`[QUEUE SERVICE] - Task ${taskID} has been completed.`);
        }
    } catch (err) {
        console.error(
            '[QUEUE SERVICE] - Error marking task as completed:',
            err.message
        );
    }
};

/**
 * Mark a task from the queue as failed
 * @param {Number} taskID - ID of the task
 * @returns {Promise<void>}
 */
const failTask = async (taskID) => {
    try {
        await crud.update(tableName, {
            data: [
                {
                    task_status: 'failed',
                    updated_at: new Date(),
                },
            ],
            where: {
                id: taskID,
            },
        });
    } catch (err) {
        console.error(
            '[QUEUE SERVICE] - Error marking task as failed:',
            err.message
        );
    }
};

module.exports = {
    addTask,
    getNextTask,
    completeTask,
    failTask,
};
