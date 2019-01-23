import nodemailer from "nodemailer";
import User from "../models/user";

module.exports = app => {
  app.post("/forgotpassword", (req, res, next) => {
    if (req.body.email === "") {
      res.json("email is required");
    }

    User.findOne({ email: req.body.email }).then(user => {
      if (user !== null) {
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
          from: req.body.from, // sender address
          to: req.body.to, // list of receivers
          subject: req.body.subject, // Subject line
          text: req.body.text, // plain text body
          html: "" // html body
        };

        // send mail with defined transport object
        let info = transporter.sendMail(mailOptions);

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
  });
};
