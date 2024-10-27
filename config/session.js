require("dotenv").config();
const pool = require("./pool");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);

module.exports = expressSession({
        store: new pgSession({
            pool: pool, // connect to DB
            // (default tableName: 'session')
        }),
        secret: process.env.SECRET,
        // 'resave' forces session to be saved back in the session store
        // regardless if there were no modifications during the req.
        resave: false, 
        // forces a session that's "uninitialized" to be saved to the
        // store (i.e. a session that's new but not modified).
        saveUninitialized: false,
        cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000 // expire session in 30 days
        }
    });