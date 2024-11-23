const pool = require('../pool');

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
    const { tableName, id, payload } = data;
    const query = `
        UPDATE ${tableName}
        SET ${Object.keys(payload)
            .map((key) => `${key} = ${payload[key]}`)
            .join(', ')}
        WHERE id = ${id}
        `;
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

module.exports = { insert, update, deleteRow };
