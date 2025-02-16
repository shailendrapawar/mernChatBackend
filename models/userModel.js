import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true

    },
    password:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    profileImg:{
        type:String,
        require:true,
    },
    gender:{
        type:String,
        require:true,
        enum:["male","female"]
    }
},{
    timestamps:true
})

const UserModel=mongoose.model("User",userSchema);

export default UserModel;