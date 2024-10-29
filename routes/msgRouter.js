const { Router } = require("express");
const msgController = require("../controllers/msgController");

const msgRouter = Router();

msgRouter.post("/", msgController.addMsg);

module.exports = msgRouter;