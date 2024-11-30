const passport = require('passport');
const localStrategy = require('./strategy');
const { crud } = require('../database/db');

passport.use(localStrategy);
passport.serializeUser((user, done) => {
    // null = no error
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await crud.get('c_users', { id });
        const user = rows[0];

        // user found, no error. Send it to passport.authenticate()
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
