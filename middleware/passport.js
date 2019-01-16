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
    (req, email, username, done) => {
      try {
        User.findOne({ email, username }).then(user => {
          if (user) {
            return done(null, false, { message: "User already exists" });
          } else {
            new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            })
              .save()
              .then(newUser => {
                console.log("user created");
                return done(null, false, { message: "User created" });
              });
          }
        });
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
    (username, password, done) => {
      try {
        User.findOne({
          username
        }).then(user => {
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
        });
      } catch (err) {
        done(err);
      }
    }
  )
);
