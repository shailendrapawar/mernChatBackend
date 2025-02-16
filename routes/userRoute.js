import express from "express"
import UserController from "../controllers/userController.js"
const userRouter=express.Router();




userRouter.post("/login",UserController.login)
userRouter.post("/register",UserController.register)


export default userRouter;