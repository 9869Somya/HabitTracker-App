const express = require("express");

const { addUser, loginUser } = require("../controller/user.controller");
const userRouter = express.Router();
userRouter.post("/register", addUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
