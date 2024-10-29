const { Router } = require("express");
const signupRouter = require("./signupRouter");
const loginRouter = require("./loginRouter");
const msgRouter = require("./msgRouter");
const db = require("../config/queries");

const memberRouter = Router();
memberRouter.get("/", async (req, res) => {
    // Handle err msgs
    const login_erors = req.session.messages;
    req.session.messages = []; // Clear errs after using them

    // Handle user msgs
    const user_msgs = await db.getAllMsgs();
    res.render("index", { 
        errors: login_erors, 
        messages: user_msgs,
        //**ASYNC NOT SUPPORTED BY EJS. LOOK INTO THIS**** */
        getName: async function(id) {
            const user = await db.getUserById;
            return user.first_name + " " + user.last_name;
        },
    });
});

memberRouter.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

memberRouter.use("/signup", signupRouter);
memberRouter.use("/login", loginRouter);
memberRouter.use("/msg-form", msgRouter);

module.exports = memberRouter;