const { person } = require('../../database/db');

module.exports = {
    createPerson: async (req, res, next) => {
        try {
            await person.insert(req.body);

            res.json({
                success: true,
                payload: req.body,
                message: 'The person has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    getPerson: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await person.get(user_id);

            if (user.rowCount === 1) {
                res.json(user.rows);
            } else {
                res.json({
                    message: "Person doesn't exist",
                });
            }
        } catch (err) {
            next(err);
        }
    },
    deletePerson: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const result = await person.delete(user_id);
            let json;

            if (result.rowCount === 1) {
                json = {
                    success: true,
                    message: 'Person has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "Person doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
};
