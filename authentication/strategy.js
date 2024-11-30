const bcrypt = require('bcryptjs');
const { crud } = require('../database/db');

const LocalStrategy = require('passport-local').Strategy;

const verifyCb = async (username, password, done) => {
    try {
        // table name is hardcoded for now since it's used only for customer users
        const rows = await crud.get('c_users', { username });
        const user = rows[0];
        console.log('🚀 ~ verifyCb ~ user:', user);

        // validate username
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        // check that email is confirmed
        if (!user.isverified) {
            return done(null, false, { message: 'Please verify your email.' });
        }

        // validate password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: 'Incorrect password' });
        }

        // pass user obj to passport.authenticate, which then passes it to req.user
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

module.exports = new LocalStrategy(verifyCb);
