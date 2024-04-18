const { Router } = require("express");
const userRouter = Router();
const { register, login, getUser } = require("../controllers/user.controllers.js");
const { auth, localVariables } = require("../middleware/auth.middleware.js");

/** routes */
/** post routes */
userRouter.post("/register", register); // register user
userRouter.post("/login", login); // login user

/** get routes */
// userRouter.get("/user/:username", getUser); // user with username


module.exports = userRouter;