// ============import imports====================================
import { configDotenv } from "dotenv";
import express from "express"
const app=express();
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./configs/dbConfig.js";
connectDB()
// ============important imports===================================





const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})