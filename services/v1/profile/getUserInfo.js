const { crud } = require('../../../database/db');

const getUserInfo = async (id) => {
    const results = await crud.get('c_users', { id });

    if (results.length === 0) {
        return {
            message: `Customer account was not found.`,
        };
    }

    const { email, account_level, isverified, created_at } = results[0];

    return {
        id,
        email,
        account_level,
        isverified,
        created_at,
    };
};

module.exports = getUserInfo;
