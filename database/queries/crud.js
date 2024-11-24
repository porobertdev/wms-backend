const knex = require('../pool');

/**
 * GET all columns and one or more rows with WHERE condition
 * @param {String} tableName - Table name
 * @param {Object} where - key-value pairs for conditions
 * @returns {Array} - all values that were found
 */
const get = async (tableName, where) => {
    const results = await knex(tableName)
        .where(where)
        .catch((err) => console.log(err.detail));

    return results;
};

/**
 * GET all columns and rows
 * @param {String} tableName - Table name
 * @returns {Array} - all values that were found
 */
const getAll = async (tableName) => {
    const results = await knex(tableName)
        .select('*')
        .catch((err) => console.log(err.detail));

    return results;
};

/**
 * INSERT one or more key-value pairs (column-row value)
 * @param {String} tableName - table name
 * @param {Array} data - array of objects
 * @returns {Array} - all values that were inserted
 */
const insert = async (tableName, data) => {
    const results = await knex(tableName)
        .insert([...data])
        .returning('*')
        .catch((err) => console.log(err.detail));

    return results;
};

/**
 * UPDATE one or more key-value pairs (column-row value)
 * @param {String} tableName - table name
 * @param {Array} data - array of objects
 * @param {Object} where - key-value pairs for conditions
 * @returns {Array} - all values that were updated
 */
const update = async (tableName, { data, where }) => {
    const results = await knex(tableName)
        .update(data)
        .where(where)
        .returning('*')
        .catch((err) => console.log(err.detail));
    return results;
};

/**
 * DELETE one or more rows with WHERE condition
 * @param {String} tableName - Table name
 * @param {Object} where - key-value pairs for conditions
 * @returns {Array} - all values that were deleted
 */
const del = async (tableName, where) => {
    const results = await knex(tableName)
        .where(where)
        .del()
        .returning('*')
        .catch((err) => console.log(err.detail));
    return results;
};

module.exports = { get, getAll, insert, update, delete: del };
