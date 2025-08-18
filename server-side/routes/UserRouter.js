const express = require("express");
const userRouter = express.Router();
const UserController = require("../controlers/users/UserController")

userRouter.post("/register", async (req, res, next) => {
    await UserController.userRegister(req, res, next);
});
userRouter.post("/login", async (req, res, next) => {
    await UserController.userLogin(req, res, next);
});
// userRouter.put("/:id", async (req, res, next) => {
//     await UserController.editPost(req, res, next);
// });
// userRouter.delete("/:id", async (req, res, next) => {
//     await UserController.deletePost(req, res, next);
// });

module.exports = userRouter;