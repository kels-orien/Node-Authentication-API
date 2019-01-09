import "dotenv/config";
import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

const passport = require("passport"),
  localStrategy = require("passport-local").Strategy,
  JWTstrategy = require("passport-jwt").Strategy,
  ExtractJWT = require("passport-jwt").ExtractJwt;
import User from "../model/user";
import jwt from "jsonwebtoken";
import passport from "passport";

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
    (firstname, lastname, email, username, password, done) => {
      try {
        User.findOne({ email, username }).then(user => {
          if (user) {
            return done(null, false, { message: "User already exits" });
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).THEN(hashedPassword => {
              const newUser =  new User({
                firstname,
                lastname,
                email,
                username,
                password: hashedPassword
              }).save();
              console.log("user created");
              return done(null, newUser);
            });
          }
        });
      } catch (err) {
        done(err);
      }
    },
  )
);


passport.use (
    'login',

    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            session: false
        },
        (username, password, done) => {
            try {
                User.findOne({
                        username
                }).then( user => {
                    if(!user){
                        throw new Error('User Not Found');
                    } else {
                        bcrypt.compare (password, user,password).then(response => {
                            if (response != true) {
                                console.log('login details are incorrects');
                                return done(null, false, {message:"login deatils are incorrect"});
                            }
                            console.log("user logged in");
                            return done(null, user);
                        })
                    }
                })
            }
        }
    )
)