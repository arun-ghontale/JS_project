var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log(req.sessionID);
  res.redirect("/auth/login");
});

module.exports = router;
