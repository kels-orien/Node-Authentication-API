import passport from "passport";

module.exports = app => {
  app.get("/auth/github", async (req, res, next) => {
    passport.authenticate("github", (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      }
      if (user) {
        console.log("New user created!");
        res.status(200).send({ message: "user created" });
      }
    })(req, res, next);
  });
};
