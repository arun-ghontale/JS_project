const express = require("express");
const router = express.Router();
const passport = require("passport");

// const loginController = require("../controllers/loginController");

router.get("/login", function (req, res) {
  //req.body - POST
  //req.query - GET
  //req.params - dynamic segments
  res.render("login");
});

// router.post("/login", function (req, res) {
//   console.log(req.body);
//   res.render("login");
// });

router.post("/login", passport.authenticate("local", {
  failureRedirect: "/auth/login"
}), function (req, res) {
  res.redirect('/users/' + req.user.id)
});

module.exports = router;