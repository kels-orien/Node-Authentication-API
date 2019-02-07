import User from "../models/user";

module.exports = app => {
  let user;
  app.get("/password-reset", async (req, res, next) => {
    console.log("resetToken: ", req.query.resetPasswordToken);
    user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: Date.now()
    });

    console.log("user reset: ", user);
    if (user !== null) {
      res.status(200),
        send({
          username: user.username,
          message: "password reset link is valid"
        });
    } else {
      console.log("password reset link is invalid");
      res.json("password reset link is invalid");
    }
  });
};
