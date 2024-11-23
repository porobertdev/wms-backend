const { user, employee, person } = require('../../database/db');
const getRandomNumber = require('../../utils/getRandomNumber');

module.exports = {
    get: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const result = await user.get(user_id);

            res.json({
                message: 'success',
                user: result,
            });
        } catch (err) {
            next(err);
        }
    },
    create: async (req, res, next) => {
        try {
            const { employee_id, role_id } = req.body;

            // we need to get person_id from `employee` table
            // and then person data from `person` table
            const { person_id } = await employee.getPersonID(employee_id);
            const personData = await person.get(person_id);
            const { first_name, last_name } = personData;

            await user.insert({
                employee_id,
                role_id,
                username: user.generateUsername({
                    fname: first_name,
                    lname: last_name,
                }),
                password: getRandomNumber(1000, 9999),
            });

            res.json({
                success: true,
                payload: req.body,
                message: 'User has been created.',
            });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const result = await user.delete(user_id);
            let json;

            if (result) {
                json = {
                    success: true,
                    message: 'User has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "User doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
    updateUserRole: async (req, res, next) => {
        try {
            const { username, roleID } = req.body;
            const result = await user.updateRole(username, roleID);
            let json;

            if (result) {
                json = {
                    success: true,
                    message: 'User role has been deleted.',
                };
            } else {
                json = {
                    success: false,
                    message: "User doesn't exist",
                };
            }

            res.json(json);
        } catch (err) {
            next(err);
        }
    },
};
