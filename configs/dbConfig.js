import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL)
        if (res) {
            console.log("DB connected for Chat App")
        }
    } catch (err) {
        console.log(err)
    }
}

export default connectDB