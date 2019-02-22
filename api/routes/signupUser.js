import passport from "passport";

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
          User.findOne({
            username: user.username
          }).then(user => {
            user.updateOne({
              firstName: req.body.firstName,
              lastName: req.body.lastName
            });
            if (user) {
              console.log("New user created!");
              res.status(200).send({ message: "user created" });
            }
          });
        });
      }
    })(req, res, next);
  });
};
