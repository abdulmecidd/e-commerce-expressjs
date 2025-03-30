const express = require("express");

const router = express.Router();

router.get("/home", (req, res, next) => {
  res.status(200).send("This is the homepage");
});

module.exports = router;
