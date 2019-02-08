import User from "../models/user";
import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

module.exports = app => {
  app.put("/updatePasswordViaEmail", async (req, res, next) => {
    let user;

    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS).then(hashPassword => {
      user = await User.findOneAndUpdate(
        { username: req.body.username },
        {
          $set: {
            password: hashPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null
          }
        },
        { new: true }
      );
    });

    if (user) {
      console.log("password updated successfully");
      res.status(200).send({ message: "password updated successfully" });
    } else {
      console.log("cannot update, user does not exist in db");
      res
        .status(200)
        .send({ message: "cannot update, user does not exist in db" });
    }
  });
};
