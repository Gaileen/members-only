const { Router } = require("express");
const signupController = require("../controllers/signupController");
const validator = require("../validators/userValidator");

const signupRouter = Router();

signupRouter.get("/", (req, res) => {
    res.render("signup");
});

signupRouter.post("/", [validator.validateUser, 
    signupController.addUser]);

module.exports = signupRouter;