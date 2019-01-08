import User from "../model/user";
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
      } else {
        req.logIn(user, err => {
          const email = user.email;
          const username = user.username;
          const user = await User.findOne({ email, username });
          if (user) {
            console.log("User already exits");
          } else {
            const newUser = await new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              username: req.body.username,
              password: req.body.password
            })
              .save()
              .then(() => {
                console.log("user created in db");
                res.status(200).send({ message: "user created" });
              });
          }
        });
      }
    })(req, res, next);
  });
};
