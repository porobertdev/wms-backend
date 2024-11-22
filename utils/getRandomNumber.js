const { faker } = require('@faker-js/faker');

/**
 * Get a random number between min and max
 * @param {Number} min - Min
 * @param {Number} max - Max
 * @returns {Number}
 */
const getRandomNumber = (min, max) =>
    // max+1 bcoz faker doesn't seem to include the limit number 🤔
    faker.number.int({ min, max });

module.exports = getRandomNumber;
