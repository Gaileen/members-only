const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./queries");

const verifyCallback = async (email, password, done) => {
    try {
        const user = await db.selectUser(email);
        if (!user) {
            return done(null, false, { message: "Incorrect username" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch (err) {
        return done(err);
    }
};

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.getUserById();
        done(null, user); // attach obj to req.user
    } catch (err) {
        done(err);
    }
});

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);