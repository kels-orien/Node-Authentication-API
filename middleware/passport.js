import "dotenv/config";
import bcrypt from "bcrypt";

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;
import User from "../models/user";

passport.use(
  "register",
  new localStrategy(
    {
      firstnameField: "firstname",
      lastnameField: "lastname",
      email: "email",
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false
    },
    async (req, username, password, done) => {
      let user;
      try {
        user = await User.findOne({
          email: req.body.email,
          username: username
        });
        if (user) {
          console.log("username or email already taken");
          return done(null, false, { message: "User already exists" });
        } else {
          user = await new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: password
          }).save();
          console.log("New user created!");
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
  new JWTstrategy(jwt, async (jwt_token, done) => {
    try {
      let user;
      user = await User.findOne({
        username: jwt_token.username
      });
      if (user) {
        console.log("user found in db");
        done(null, user);
      } else {
        console.log("user not found in db");
        done(null, false);
      }
    } catch (err) {
      done(err);
    }
  })
);
