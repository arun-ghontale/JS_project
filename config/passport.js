const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcypt = require("bcrypt");
var User = require("../models/User");

/*
passport.js stuff goes here
*/

/* 'done' here is a callback given by passport*/
passport.use(
    new localStrategy({
            usernameField: "email",
            passwordField: "password",
        },
        function (email, password, done) {

            User.findOne({
                email: email
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: "Invalid credentials!"
                    })
                }

                const isVerified = bcypt.compareSync(password, user.password);
                if (isVerified) {
                    done(null, user)
                } else {
                    done(null, false, {
                        message: "Invalid credentials!"
                    })
                }
            })
        }
    ));

/*serialization and deserialization is done to */
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(null, user)
    })
});

module.exports = passport