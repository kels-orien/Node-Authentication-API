import User from "../models/user";
import jwt from "jsonwebtoken";
import passport from "passport";

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
          const user = User.findOne({ email, username });
          if (user) {
            console.log("User already exists");
          } else {
            const newUser = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            })
              .save()
              .then(() => {
                console.log("user created in db");
                res.status(200).send({ message: "user created in signup" });
              });
          }
        });
      }
    })(req, res, next);
  });
};
