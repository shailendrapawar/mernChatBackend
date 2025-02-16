import { configDotenv } from "dotenv";
import express from "express"
const app=express();
import dotenv from "dotenv"
dotenv.config()





const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})