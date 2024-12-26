const bcrypt = require('bcryptjs');
const { crud } = require('../database/db');

const LocalStrategy = require('passport-local').Strategy;

const verifyCb = async (email, password, done) => {
    try {
        // table name is hardcoded for now since it's used only for customer users
        const rows = await crud.get('c_users', { email });
        const user = rows[0];
        console.log('🚀 ~ verifyCb ~ user:', user);

        // validate email
        if (!user) {
            return done(null, false, { message: 'Incorrect email' });
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

// thanks https://stackoverflow.com/a/18142000
module.exports = new LocalStrategy({ usernameField: 'email' }, verifyCb);
