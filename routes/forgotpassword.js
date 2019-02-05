import nodemailer from "nodemailer";
import User from "../models/user";
import crypto from "crypto";
import "dotenv/config";
module.exports = app => {
  let user;
  app.post("/forgotpassword", async (req, res, next) => {
    if (req.body.email === "") {
      res.json("email is required");
    }

    user = await User.findOne({ email: req.body.email });
    if (user !== null) {
      const token = crypto.randomBytes(20).toString("hex");
      user.update({
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 360000
      });
      let account = nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass // generated ethereal password
        }
      });

      let mailOptions = {
        from: `passportAuthDemo@gmail.com`, // sender address
        to: user.email, // list of receivers
        subject: "Reset Your Password", // Subject line
        text:
          `This email was sent because you requested a password change fro your account.\n\n` +
          `please change your password immediately by clicking on the following link` +
          `http://localhost:8001/reset/${token}\n\n` +
          `Ignore message if password change was not requested by you`, // plain text body
        html: "" // html body
      };

      // send mail with defined transport object
      let info = await transporter.sendMail(mailOptions);

      if (info.err) {
        return response.status(500).send("500 - Internal Server Error");
      }

      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.status(200).send({
        message: "recovery message sent"
      });
    } else {
      console.log("email not found");
      res.json("email not in db");
    }
  });
};
