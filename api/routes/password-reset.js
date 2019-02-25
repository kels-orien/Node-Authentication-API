import User from "../models/user";

module.exports = app => {
  app.get("/password-reset", async (req, res, next) => {
    try {
      console.log("resetToken: ", req.query.resetPasswordToken);
      const user = await User.findOne({
        resetPasswordToken: req.query.resetPasswordToken
      });

      console.log("user reset: ", user);
      if (user !== null) {
        res.status(200).send({
          username: user.username,
          message: "password reset link is valid"
        });
      } else {
        console.log("password reset link is invalid");
        res.json("password reset link is invalid");
      }
    } catch (err) {
      console.log(err);
    }
  });
};
