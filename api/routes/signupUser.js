import passport from "passport";
import User from "../models/user";

module.exports = app => {
  app.post("/signupUser", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username
          };
          User.findOne({
            username: data.username
          }).then(user => {
            user
              .updateOne({
                firstName: data.firstName,
                lastName: data.lastName
              })
              .then(() => {
                console.log("New user created!");
                res.status(200).send({ message: "user created" });
              });
          });
        });
      }
    })(req, res, next);
  });
};
