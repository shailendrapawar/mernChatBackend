// ============import imports====================================
import express from "express"
import { configDotenv } from "dotenv";
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./configs/dbConfig.js";
connectDB()
//================router imports================
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js"
// ===============================================

// ============== socket imports================
import {app,myServer,io} from "./socket/socket.js"



//==============middelwares imports==============
import cors from "cors"
import cookieParser from "cookie-parser";
app.use(cors({
    origin:["*","http://localhost:5173"],
    credentials:true,
    methods:["POST","GET"],
    
}))
app.use(cookieParser())
app.use(express.json())
app.use("/auth",userRouter)
app.use("/user",messageRouter)

app.get("/",(req,res)=>{
    res.status(200).send("server working")

})



//================router imports








const PORT=process.env.PORT||5000
myServer.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)

})