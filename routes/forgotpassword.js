module.exports = app => {
  app.post("/forgotpassword", (req, res, next) => {
    if (req.body.email === "") {
      res.json("email is required");
    }
  });
};
