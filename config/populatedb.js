
// only users w/o acc.s cannot see author/date.
// all users who sign up will b given membership.
// admin is the only special user who can delete msgs.

/* DB STRUCTURE
*   TABLE session (its vals will b init by app.js)
*   TABLE users:
*    id, first name, last name, usernm/email, 
*    pwd, (membership) status, admin (BOOL)
*   TABLE msgs:
*    id, user_id (FOREIGN KEY), msg, time 
*/