const express = require("express");
const router = express.Router();
const path = require("path");
const adminRouter = require("./admin/admin.router");
const orderRouter = require("./orders/order.router");
const fileRoutes = require("./product/product.router");
const authRouter = require("./auth/auth.router");
const userRouter = require("./user/user.router")

//http://localhost:5000/api/admin
router.use("/admin", adminRouter);

// http://localhost:5000/api/order
router.use("/order", orderRouter);

router.use("/uploads", express.static(path.join(__dirname, "uploads")));

// http://localhost:5000/api/product
router.use("/product", fileRoutes.routes);

// http://localhost:5000/api/auth
router.use("/auth", authRouter);  

// http://localhost:5000/api/auth
router.use("/user", userRouter);
module.exports = router;
