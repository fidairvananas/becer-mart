const express = require("express");
const categoryRouter = express.Router();
const CategoryController = require("../controlers/categories/CategoryController")


categoryRouter.get("/", async (req, res, next) => {
    await CategoryController.getAllCategory(req, res, next);
});
categoryRouter.post("/", async (req, res, next) => {
    await CategoryController.addCategory(req, res, next);
});
categoryRouter.put("/:id", async (req, res, next) => {
    await CategoryController.editCategory(req, res, next);
});
categoryRouter.delete("/:id", async (req, res, next) => {
    await CategoryController.deleteCategory(req, res, next);
});

module.exports = categoryRouter;