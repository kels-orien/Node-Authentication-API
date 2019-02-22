import passport from "passport";

module.exports = app => {
  let user;
  app.get("/getUser", async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info !== undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        console.log("user found in db");

        res.status(200).send({
          auth: true,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          username: user.username,
          password: user.password,
          message: "user found"
        });
      }
    })(req, res, next);
  });
};
