const passport = require("passport");
const { validPassword } = require("../lib/passwordUtils");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./database");


const customFields = {
    usernameField : "username",
    passwordField : "password"
}

const verifyCallback = (username, password, done)=>{
    User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        const isValid = validPassword(password,user.hash,user.salt) //it's a function that check password
        if (!isValid) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      });
}

const strategy = new LocalStrategy(customFields , verifyCallback);

passport.use(strategy)


passport.serializeUser(function(useradmin, done) {
    done(null, useradmin.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, useradmin) {
      done(err, useradmin);
    });
  });