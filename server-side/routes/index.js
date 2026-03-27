const express = require("express");
const router = express.Router();
const userRouter = require("./UserRouter");
const productRouter = require("./ProductRouter");
const categoryRouter = require("./CategoryRouter");

router.use("/auth", userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);

module.exports = { router };
