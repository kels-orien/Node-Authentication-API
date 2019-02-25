import passport from "passport";
import User from "../models/user";

module.exports = app => {
  app.put("/updateUser", (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      async (err, user, info) => {
        try {
          if (err) {
            console.log(err);
          }

          if (info !== undefined) {
            console.log(info);
          }
          if (user === null) {
            console.log("user not found; cannot update");
            res.status(404).json("User does not exist; cannot update");
          }
          if (user) {
            const updatedUser = await User.findOneAndUpdate(
              { username: user.username },
              {
                $set: {
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  username: req.body.username
                }
              },
              { new: true }
            );

            if (updatedUser) {
              console.log("user updated");
              res.status(200).send({ auth: true, message: "user updated" });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    )(req, res, next);
  });
};
