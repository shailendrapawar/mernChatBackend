import express from "express"
import UserController from "../controllers/userController.js"
import authmiddleware from "../middlewares/authMiddleware.js";
const userRouter=express.Router();




userRouter.post("/login",UserController.login)
userRouter.post("/register",UserController.register)

userRouter.get("/getOtherUsers",authmiddleware,UserController.getOtherUsers);
userRouter.get("/logout",UserController.logout)


export default userRouter;