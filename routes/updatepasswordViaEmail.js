import User from "../models/user";

module.exports = app => {
  let user;
  app.post("/updatepasswordViaEmail", async (req, res, next) => {
    user = await User.findOne({
      username: req.body.username
    });
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
};
