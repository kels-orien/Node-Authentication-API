import User from "../models/user";

module.exports = app => {
  let user;
  app.put("/updatepasswordViaEmail", async (req, res, next) => {
    user = await User.findOne({
      username: req.body.username
    });
    if (user !== null) {
      user.update({
        password: req.body.password,
        resetPasswordToken: null,
        reserPasswordExpires: null
      });
      res.status(200).send({ message: "password updated  successfully" });
    } else {
      console.log("cannot update, user does not exist in db");
      res.status(404).json("cannot update, user does not exist in db");
    }
  });
};
