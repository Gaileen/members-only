const { Router } = require("express");
const signupRouter = require("./signupRouter");
const loginRouter = require("./loginRouter");

const memberRouter = Router();
memberRouter.get("/", (req, res) => {
    const login_erors = req.session.messages;
    req.session.messages = []; // Clear errs after using them
    res.render("index", { errors: login_erors });
});

memberRouter.use("/signup", signupRouter);
memberRouter.use("/login", loginRouter);

module.exports = memberRouter;