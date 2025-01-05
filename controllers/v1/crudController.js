const { crud } = require('../../database/db');

/*
can't use `this` with arrow functions in this context,
and I don't want normal functions lol.
So we use the closures.
*/
module.exports = (tableName) => {
    return {
        tableName,
        add: async (req, res, next) => {
            try {
                const results = await crud.add(tableName, [req.body]);
                console.log('🚀 ~ add: ~ results:', results);

                // TODO: get rid of this shit XD
                if (tableName === 'customer_order') {
                    req.order_id = results[0].id;
                }

                res.status(201).json({ results });

                // needed for processOrder controller
                if (tableName === 'customer_order') {
                    next();
                }
            } catch (err) {
                next(err);
            }
        },

        get: async (req, res, next) => {
            try {
                const { id } = req.params;
                const conditions = req.query || {};

                const results = await crud.get(
                    tableName,
                    id ? { id } : conditions
                );

                res.status(200).json(results);
            } catch (err) {
                next(err);
            }
        },

        getAll: async (req, res, next) => {
            try {
                const results = await crud.getAll(tableName);

                if (!results.length) {
                    res.status(404).json({
                        error: `Record not found in ${tableName}.`,
                    });
                } else {
                    res.status(200).json(results);
                }
            } catch (err) {
                next(err);
            }
        },

        update: async (req, res, next) => {
            try {
                const { id } = req.params;
                const data = req.body;
                const results = await crud.update(tableName, {
                    data,
                    where: { id },
                });

                if (!results.length) {
                    res.status(404).json({
                        error: `Record not found in ${tableName}.`,
                    });
                } else {
                    res.status(200).json({
                        message: `Record in ${tableName} updated successfully.`,
                        results,
                    });
                }
            } catch (err) {
                next(err);
            }
        },

        delete: async (req, res, next) => {
            try {
                const { id } = req.params;
                // TODO: support deleting based on any column
                const results = await crud.delete(tableName, { id });

                if (!results.length) {
                    res.status(404).json({
                        error: `Record not found in ${tableName}.`,
                    });
                } else {
                    res.status(200).json({
                        message: `Record in ${tableName} deleted successfully.`,
                        results,
                    });
                }
            } catch (err) {
                next(err);
            }
        },
    };
};
