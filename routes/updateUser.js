import passport from "passport";
import User from "../models/user";

module.exports = app => {
  app.put("updateUser", (res, req, next) => {
    passport.authenticate("jwt", (err, info, user) => {
      if (err) {
        console.log(err);
      }

      if (info !== undefined) {
        console.log(info);
      } else {
        User.findOne({
          username: user.username
        }).then(user => {
          if (user === null) {
            console.log("user not found; cannot update");
            res.status(404).json("User does not exist; cannot update");
          } else {
            user
              .update({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                bio: req.body.bio,
                profileImage: req.body.profileImage
              })
              .then(() => {
                console.log("user updated");
                res.status(200).send({ auth: true, message: "user updated" });
              });
          }
        });
      }
    });
  });
};
