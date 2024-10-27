const pool = require("./pool");

async function insertUser(fname, lname, email, hashedPwd, status="member") {
    await pool.query("INSERT INTO users (first_name, last_name, email, pwd, status) VALUES ($1, $2, $3, $4, $5)",
        [fname, lname, email, hashedPwd, status]);
}

async function selectUser(email) {
    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1",
        [email]);
    return rows[0];
}

// only used by passport
async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
}

//async function getAllMsgs() {}

module.exports = {
    insertUser,
    selectUser,
    getUserById,
};