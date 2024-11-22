const fs = require('node:fs');

/**
 * Your classic Foo Engine
 * @typedef {Object} rwJSON
 * @method saveData Save data to a JSON file
 * @method getData Read JSON file
 */

/**
 * Save JSON data to a file
 * @param {String} - Data Path. E.g. from `path.join(__dirname, 'data.json')`
 */
const saveData = (dataPath) => {
    const json = JSON.stringify(tables);

    fs.writeFileSync(dataPath, json, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data saved succesfully');
        }
    });
};

/**
 * Read a JSON file
 * @param {String} - Data Path. E.g. from 'node:path'
 * @returns {Object} Parsed JSON
 */
const readData = (dataPath) => {
    let result;

    try {
        const data = fs.readFileSync(dataPath, 'utf8');
        result = JSON.parse(data);
    } catch (err) {
        console.error(err);
    }

    return result;
};

module.exports = { rwJSON: { saveData, readData } };
