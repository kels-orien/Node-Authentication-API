import User from "../models/user";
import jwt from "jsonwebtoken";
import passport from "passport";
import "dotenv/config";

module.exports = app => {
  app.post("/signinuser", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const email = req.body.email;
          const username = req.body.username;
          User.findOne({ username }).then(user => {
            const token = jwt.sign(
              { id: user.username },
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
