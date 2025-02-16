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
// ===============================================




//==============middelwares imports==============
import cors from "cors"

app.use(cors({
    origin:"*",
    methods:["POST","GET"]
}))
app.use(express.json())
app.use("/auth",userRouter)



//================router imports








const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})