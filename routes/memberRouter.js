const { Router } = require("express");
//require "./controllers/"

const memberRouter = Router();
memberRouter.get("/", (req, res) => res.send("Hi!"));

module.exports = memberRouter;