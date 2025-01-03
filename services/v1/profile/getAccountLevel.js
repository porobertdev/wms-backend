const { crud } = require('../../../database/db');

const getAccountLevel = async (id) => {
    // find which level the account is.

    const results = await crud.get('c_users', {
        where: { id },
    });

    if (results.length === 0) {
        return {
            message: `Customer account was not found.`,
        };
    }
    return results[0].account_level;
};

module.exports = getAccountLevel;
