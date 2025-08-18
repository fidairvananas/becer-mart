const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controlers/products/ProductController");

productRouter.get("/", async (req, res, next) => {
  await ProductController.getAllProduct(req, res, next);
});
productRouter.get("/category", async (req, res, next) => {
  await ProductController.getProductByCategoryId(req, res, next);
});
productRouter.get("/:id", async (req, res, next) => {
  await ProductController.getProductById(req, res, next);
});
productRouter.post("/", async (req, res, next) => {
  await ProductController.addProduct(req, res, next);
});
productRouter.put("/:id", async (req, res, next) => {
  await ProductController.editProduct(req, res, next);
});
productRouter.delete("/:id", async (req, res, next) => {
  await ProductController.deleteProduct(req, res, next);
});

module.exports = productRouter;
