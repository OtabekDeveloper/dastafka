const express = require("express");
const router = express.Router();
const userController = require("./user.controller");

router.route("/").get(userController.getuser);
router.route("/").post(userController.adduser);
router.route("/:id").put(userController.updateuser);
router.route("/:id").delete(userController.deleteuser);
module.exports = router;
