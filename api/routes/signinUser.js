import User from "../models/user";
import jwt from "jsonwebtoken";
import passport from "passport";
import "dotenv/config";

module.exports = app => {
  app.post("/signinUser", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          User.findOne({ username: req.body.username }).then(user => {
            const token = jwt.sign(
              { username: user.username },
              process.env.JWT_SECRET
            );
            res.status(200).send({
              auth: true,
              token: token,
              message: "user found & logged in"
            });
          });
        });
      }
    })(req, res, next);
  });
};
