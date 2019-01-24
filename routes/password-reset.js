import User from "../models/user";

module.exports = app => {
  let user;
  app.get("/password-reset", async (req, res, next) => {
    user = await User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: Date.now()
    });

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
