require("dotenv").config();
const express = require("express");
const memberRouter = require("./routes/memberRouter");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const pool = require("./config/pool");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
app.use(expressSession({
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
}));

app.use("/", memberRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});