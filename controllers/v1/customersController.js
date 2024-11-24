const { customer } = require('../../database/db');

module.exports = {
    get: async (req, res, next) => {
        try {
            const { customer_id } = req.params;
            const result = await customer.get(customer_id);

            res.json({
                message: 'success',
                customer: result,
            });
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const { type, person_id } = req.body;

            await customer.insert({ type, person_id });

            res.json({
                success: true,
                payload: req.body,
                message: 'Customer has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { customer_id } = req.params;
            const result = await customer.delete(customer_id);
            let json;

            if (result) {
                json = {
                    success: true,
                    message: 'Customer has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "Customer doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
};
