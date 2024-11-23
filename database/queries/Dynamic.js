const pool = require('../pool');

const createWhereContraint = (obj) => {
    return (
        'WHERE ' +
        Object.keys(obj)
            .map((key) => `${key} = ${obj[key]}`)
            .join(' AND ')
    );
};

const joinKeyValues = (obj, joiner) =>
    `${Object.keys(obj)
        .map((key) => `${key} = ${obj[key]}`)
        .join(joiner)}`;

/**
 * Get new records from a table dynamically
 * @param {Object} data
 * @param {String} data.tableName - Table name
 * @param {Object} data.payload - key-value pairs representing column-value pairs
 * @returns {Array}
 */
const get = async (data) => {
    const { tableName, columns, where } = data;
    console.log('🚀 ~ get ~ where:', where);

    const query = `
        SELECT ${columns === '*' ? columns : columns.split(',').join(', ')} FROM ${tableName}
        ${where ? createWhereContraint(where) : ''}
        `;
    console.log('🚀 ~ get ~ query:', query);

    const results = await pool.query(query);
    return results.rows;
};

/**
 * Insert new records into a table dynamically
 * @param {Object} data
 * @param {String} data.tableName - Table name
 * @param {Object} data.payload - key-value pairs representing column-value pairs
 * @returns {Array}
 */
const insert = async (data) => {
    const { tableName, payload } = data;
    const columns = Object.keys(payload);
    const values = Object.values(payload);

    const query = `
        INSERT INTO ${tableName}
        (${columns.join(', ')})
        VALUES (${values.map((v, index) => '$' + (index + 1)).join(', ')})
        `;

    await pool.query(query, values);
};

/**
 * Update any table records dynamically using the primary ID for 'where' condition
 * @param {Object} data
 * @param {String} data.tableName - Table name
 * @param {Object} data.payload - Payload containing key-value pairs for column-rows
 * @returns {Boolean} - True/false based on updating success
 */
const update = async (data) => {
    const { tableName, payload, where } = data;
    const query = `
        UPDATE ${tableName}
        SET ${joinKeyValues(payload, `, `)}
            ${where ? createWhereContraint(where) : ''}`;
    console.log('🚀 ~ update ~ query:', query);

    const result = await pool.query(query);

    return result.rowCount === 1 ? true : false;
};

/**
 * Delete a row by primary ID
 * @param {Object} data
 * @param {String} data.tableName - Table name
 * @param {Number} data.id - ID of the PK row
 */
const deleteRow = async (data) => {
    const { tableName, id } = data;
    const query = `
        DELETE FROM ${tableName}
        WHERE id = ${id}
        `;
    const result = await pool.query(query);

    return result.rowCount === 1 ? true : false;
};

module.exports = { get, insert, update, deleteRow };
