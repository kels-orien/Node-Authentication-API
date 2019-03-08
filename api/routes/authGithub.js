import passport from "passport";

module.exports = app => {
  app.get("/authGithub", (req, res, next) => {
    passport.authenticate("github", (err, user) => {
      if (err) {
        console.log(err);
      }

      if (user) {
        console.log("New user created!: ", user);
        res.status(200).send({ message: "user created" });
      }
    })(req, res, next);
  });
};
