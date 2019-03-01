import "dotenv/config";
import bcrypt from "bcrypt";

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  jwtStrategy = require("passport-jwt").Strategy,
  GitHubStrategy = require("passport-github").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;
import User from "../models/user";

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false
    },
    async (req, username, password, done) => {
      let user;
      try {
        user = await User.findOne({
          username: username
        });
        if (user) {
          console.log("username already taken");
          return done(null, false, {
            message: "Username already taken"
          });
        } else {
          user = await new User({
            username: req.body.username,
            password: password,
            email: req.body.email
          }).save();
          console.log("New user created in Passport!");
        }
        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",

  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: false
    },
    async (username, password, done) => {
      let user;
      try {
        user = await User.findOne({ username });

        if (!user) {
          return done(null, false, {
            message: "Wrong username/password details"
          });
        } else {
          bcrypt.compare(password, user.password).then(response => {
            if (response !== true) {
              console.log("login details are incorrect");
              return done(null, false, {
                message: "login details are incorrect"
              });
            }
            console.log("user logged in");
            return done(null, user);
          });
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

const jwt = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  "jwt",
  new jwtStrategy(jwt, async (jwt_token, done) => {
    try {
      let user;
      user = await User.findOne({
        username: jwt_token.username
      });
      if (user) {
        console.log("user found in db");
        return done(null, user);
      } else {
        console.log("user not found in db");
        return done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8001/authGithubCallback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      try {
        user = await User.findOne({
          username: profile.id
        });
        if (user) {
          console.log("username already taken");
          return done(null, false, {
            message: "Username already taken"
          });
        } else {
          user = await new User({
            username: profile.id,
            email: profile.email
          }).save();
          console.log("New user created in Github Passport!");
        }
        return cb(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
