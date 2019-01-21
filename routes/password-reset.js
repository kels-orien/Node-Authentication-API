import User from "../models/user";

module.exports = app => {
  app.get("/password-reset", (req, res, next) => {
    User.findOne({
      resetPasswordToken: req.query.resetPasswordToken,
      resetPasswordExpires: Date.now()
    }).then(user => {
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
  });
};
