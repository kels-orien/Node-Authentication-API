import User from "../models/user";

module.exports = app => {
  app.post("/updatepasswordViaEmail", (req, res, next) => {
    User.findOne({
      username: req.body.username
    }).then(user => {
      if (user !== null) {
        user.update({
          password: req.body.password,
          resetPasswordToken: null,
          reserPasswordExpires: null
        });
      } else {
        console.log("cannot update, user does not exist in db");
        res.status(404).json("cannot update, user does not exist in db");
      }
    });
  });
};
