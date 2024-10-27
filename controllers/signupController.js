const bcrypt = require("bcryptjs");
const db = require("../config/queries");
const { validationResult } = require("express-validator");

async function addUser(req, res) {
    const { fname, lname, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const prev = { fname, lname, email };
        return res.status(400).render("signup", {
            prev: prev,
            errors: errors.array()
        });
    }

    bcrypt.hash(password, 10,
        async (err, hashedPwd) => {
            try {
                await db.insertUser(fname, lname, email, hashedPwd);
                res.redirect("/");
            } catch (err) {
                return next(err);
            }
        }
    );
}

module.exports = {
    addUser,
};