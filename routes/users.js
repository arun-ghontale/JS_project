var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/:id", function (req, res, next) {
  console.log(req.params)
  console.log(req.session);
  console.log(req.user);
  res.send("respond with a resource");
});

module.exports = router;