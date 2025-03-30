const express = require("express");

const router = express.Router();

router.get("/login", (req, res, next) => {
  res.status(200).send("This is the login page");
});

module.exports = router;
