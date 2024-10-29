const db = require("../config/queries");

async function addMsg(req, res) {
    await db.insertMsg(req.user.id, req.body.msg);
    res.redirect("/");
}

module.exports = {
    addMsg,
};