const knex = require('../../../database/pool');

const getPersonInfo = async (userID) => {
    const results = await knex('customer')
        .innerJoin('person', function () {
            this.on('customer.person_id', '=', 'person.id');
        })
        // .leftJoin('person')
        .select(
            'customer.id as customer_id',
            'person.id',
            'person.first_name',
            'person.last_name',
            'person.birth_date',
            'person.city',
            'person.address',
            'person.phone_number'
        )
        .whereIn('customer.c_user_id', [userID]);

    return results[0];
};

module.exports = getPersonInfo;
