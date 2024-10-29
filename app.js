require("dotenv").config();
const express = require("express");
const memberRouter = require("./routes/memberRouter");
const app = express();
app.set("view engine", "ejs");

const passport = require("passport");
const session = require("./config/session");
require("./config/passport"); // include our passport middleware

/* Middleware */
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // lets us parse easily (req.body...)
app.use(session);
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

/* Routes */
app.use("/", memberRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});