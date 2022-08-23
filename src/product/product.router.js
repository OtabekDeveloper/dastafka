"use strict";

const express = require("express");
const { upload } = require("../../helpers/filehelper");
const {
  addProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  sendHome
} = require("./product.controller");
const router = express.Router();

router.post("/", upload.array("files"), addProduct);

router.get("/", getProduct);
router.get("/sendHome", sendHome);

router.delete("/:id", deleteProduct);
router.put("/:id", upload.array("files"), updateProduct);

module.exports = {
  routes: router,
};
