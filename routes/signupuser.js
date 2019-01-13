import User from "../models/user";
import jwt from "jsonwebtoken";
import passport from "passport";

module.exports = app => {
  app.post("/signupuser", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      }
    })(req, res, next);
  });
};
