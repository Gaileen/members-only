const { Router } = require("express");
const signupRouter = require("./signupRouter");

const memberRouter = Router();
memberRouter.get("/", (req, res) => res.render("index"));

memberRouter.use("/signup", signupRouter);

module.exports = memberRouter;