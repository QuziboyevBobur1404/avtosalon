const { Router } = require("express");
const { register } = require("../controller/auth.controller");
const { verify } = require("jsonwebtoken");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
module.exports = authRouter;
