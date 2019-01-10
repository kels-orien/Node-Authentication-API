import "dotenv/config";
import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;
import User from "../models/user";
import jwt from "jsonwebtoken";

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
    async (firstname, lastname, email, username, password, done) => {
      const user = await User.findOne({ email, username });
      if (user) {
        return done(null, false, { message: "User already exits" });
      } else {
        var hPassword = "";
        bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
          hPassword = hashedPassword;
        });

        const newUser = await new User({
          firstname,
          lastname,
          email,
          username,
          password: hPassword
        }).save();
        console.log("user created");
        return done(null, newUser);
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
    (username, password, done) => {
      try {
        User.findOne({
          username
        }).then(user => {
          if (!user) {
            return done(null, false, {
              message: "Wrong username/password deatils"
            });
          } else {
            bcrypt.compare(password, user, password).then(response => {
              if (response != true) {
                console.log("login details are incorrect");
                return done(null, false, {
                  message: "login deatils are incorrect"
                });
              }
              console.log("user logged in");
              return done(null, user);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);
