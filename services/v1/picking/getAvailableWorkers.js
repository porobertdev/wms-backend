const knex = require('../../../database/pool');

const getAvailableWorkers = async () => {
    /*
    SQL
    SELECT users.id AS user_id, users.username, users.islogged, user_role.name AS role_name, picking_list.id AS picking_list_id 
    FROM users
    INNER JOIN user_role ON user_role.name = 'worker' AND user_role.id = users.role_id AND users.islogged = 'true'
    INNER JOIN picking_list ON picking_list.worker_id = users.id;
    */

    try {
        const workers = await knex('users')
            .innerJoin('user_role', function () {
                this.on('user_role.id', '=', 'users.role_id')
                    .andOn(knex.raw('user_role.name = ?', ['worker']))
                    .andOn(knex.raw('users.islogged = ?', [true]));
            })
            .leftJoin('picking_list', 'picking_list.worker_id', 'users.id')
            .select(
                'users.id AS user_id',
                'users.username',
                'users.islogged',
                'user_role.name AS role_name',
                'picking_list.id AS picking_list_id'
            )
            .whereNull('picking_list.id'); // Filter out workers with an assigned picking list

        return workers;
    } catch (err) {
        console.error(
            '[GET AVAILABLE WORKERS] - Error fetching available workers.',
            err.message
        );
    }
};

module.exports = getAvailableWorkers;
