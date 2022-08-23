const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.route("/").post(authController.Login);

module.exports = router;
