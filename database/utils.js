const { faker } = require('@faker-js/faker');

/* You have a location made up of:

# T01...N - wh section
# -A-02-A ... -Z-99-N section's shelf

T01-A-02-A

You need to create a function that takes an array of objects, where each object contains:
    - number of starting position: T01...T99
    - main start and end letter for the shelf - T01-A
    - num of start & end position for "nested" shelves : A-02...A-99
    - start & end letter for the nested shelves */

// const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Generate Warehouse Bin Locations
 * @param {Object} location
 * @param {String} location.base - Base, e.g. T01, T02... T0N
 * @param {Number} location.nested_num_start - Start from number, ,e.g. 1 for T01
 * @param {Number} location.nested_num_end - End number
 * @param {String} location.nested_letter_start - Letter Start
 * @param {String} location.nested_letter_end - Letter End
 */
const generateBinLocations = (location) => {
    const {
        base,
        nested_num_start,
        nested_num_end,
        nested_letter_start,
        nested_letter_end,
    } = location;

    const location_codes = [];
    const alphabet = 'ABCDEFGHIJKLMN';

    for (const char of alphabet) {
        for (let n = nested_num_start; n < nested_num_end; n++) {
            const indexStart = alphabet.indexOf(nested_letter_start);
            const indexEnd = alphabet.indexOf(nested_letter_end);

            for (const nestedChar of alphabet.slice(indexStart, indexEnd)) {
                location_codes.push(
                    `${base}-${char}-${n < 10 ? '0' + n : n}-${nestedChar}`
                );
            }
        }
    }

    return location_codes;
};

module.exports = { generateBinLocations };
