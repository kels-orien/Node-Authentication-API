import User from "../models/user";
import jwt from "jsonwebtoken";
import passport from "passport";
import "dotenv/config";

module.exports = app => {
  let logInUser;
  app.post("/signinuser", (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
      if (err) {
        console.log(err);
      }

      if (info != undefined) {
        console.log(info.message);
        res.send(info.message);
      } else {
        req.logIn(user, err => {
          logInUser = await User.findOne({ username: req.body.username });
          const token = jwt.sign(
            { id: logInUser.username },
            process.env.JWT_SECRET
          );
          res.status(200).send({
            auth: true,
            token: token,
            message: "user found & logged in"
          });
        });
      }
    })(req, res, next);
  });
};
