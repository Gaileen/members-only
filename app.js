require("dotenv").config();
const express = require("express");
const memberRouter = require("./routes/memberRouter");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false })); // lets us parse easily (req.body...)

const passport = require("passport");
const session = require("./config/session");

/* Middleware */
app.use(session);
app.use(passport.session());
require("./config/passport"); // defined passport middleware
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