import passport from "passport";

module.exports = app => {
  app.get("/authGithubCallback", (req, res, next) => {
    passport.authenticate("github", (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      }
      if (user) {
        console.log("New user created in Callback!");
        res.status(200).send({
          email: user.email,
          username: user.username,
          message: "user created"
        });
      }
    })(req, res, next);
  });
};
