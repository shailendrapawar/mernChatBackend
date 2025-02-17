import express from "express"
import MessageController from "../controllers/messageController.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const messageRouter=express.Router();

messageRouter.get("/getMessages/:id",authMiddleware,MessageController.getMessages);
messageRouter.post("/sendMessage",authMiddleware,MessageController.sendMessage)


export default messageRouter;