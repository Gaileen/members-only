const { body } = require("express-validator");
const db = require("../config/queries");

const lengthErr= "must be 4 characters or longer.";
const emailErr = "Must provide a valid email.";
const emptyErr = "is required.";
//const uniqueErr = "Email already taken. Please use a different email.";

const isUniqueEmail = async (email) => {
    const user = await db.selectUser(email);
    if (!user) {
        return true;
    } else {
        throw new Error("Email already taken. Please use a different email.");
    }
};

const validateUser = [
    body("fname").trim()
        .notEmpty().withMessage(`First name ${emptyErr}`),
    body("lname").trim()
        .notEmpty().withMessage(`Last name ${emptyErr}`),
    body("email").trim()
        .isEmail().withMessage(emailErr)
        .custom(isUniqueEmail),
    body("password")
        .isLength().withMessage(`Password ${lengthErr}`)
];

module.exports = {
    validateUser
};