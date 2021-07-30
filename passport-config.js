const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, user) {
  const authenticateUser = async (username, password, done) => {
    if (user == null) {
      return done(null, false, { message: "User not found" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "username" }),
    authenticateUser
  );
  passport.serializeUser((user, done) => {});
  passport.deserializeUser((uidser, done) => {});
}

module.exports = initialize;
