require("dotenv").config();
const { Client } = require("pg");
// only users w/o acc.s cannot see author/date.
// all users who sign up will b given membership.
// admin is the only special user who can delete msgs.
// (admin will be directly added to DB via terminal.)

/* DB STRUCTURE
*   TABLE session (alr created w terminal cmd from connect-pg-simple docs)
*   TABLE users:
*    id, first name, last name, usernm/email, 
*    pwd, (membership) status, admin (BOOL)
*   TABLE msgs:
*    id, user_id (FOREIGN KEY), msg, time 
*/

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR ( 255 ) NOT NULL,
    last_name VARCHAR ( 255 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    pwd VARCHAR ( 255 ) NOT NULL,
    status VARCHAR ( 255 ) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE 
);

CREATE TABLE IF NOT EXISTS msgs (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER,
    msg VARCHAR (280),
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
`;
// ("ON DELETE CASCADE" auto-deletes associated rows
// if foreign key is deleted in users.)

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DATABASE_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();