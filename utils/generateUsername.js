/**
 * Generate a username based on first and last names
 * @param {Object} data
 * @param {String} data.fname - First name
 * @param {String} data.lname - Last name
 */
const generateUsername = (data) => {
    const { fname, lname } = data;
    // TODO: handle duplicated username conflicts for persons with the same fname & lname
    const part1 = fname.slice(0, 2);
    const part2 = lname.slice(0, 3);

    return (part1 + part2).toLowerCase();
    // return (
    // (part1 + part2).toLowerCase() +
    // `${faker.number.int({ min: 10, max: 99 })}`
    // );
};

module.exports = generateUsername;
