// ============import imports====================================
import { configDotenv } from "dotenv";
import express from "express"
const app=express();
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./configs/dbConfig.js";
connectDB()
//================router imports================
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js"
// ===============================================




//==============middelwares imports==============
import cors from "cors"
import cookieParser from "cookie-parser";
app.use(cors({
    origin:"*",
    credentials:true,
    methods:["POST","GET"],
    
}))
app.use(cookieParser())
app.use(express.json())
app.use("/auth",userRouter)
app.use("/user",messageRouter)




//================router imports








const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)

})