const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// const loginController = require("../controllers/loginController");

router.get("/", function(req, res) {
  res.render("signup");
});

router.post("/", function(req, res) {
  console.log(req.body);
  User.create(
    {
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    },
    function(err, user) {
      res.json(user);
    }
  );

  //   res.render("signup");
});

module.exports = router;
