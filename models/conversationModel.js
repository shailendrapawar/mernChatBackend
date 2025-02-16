import mongoose from "mongoose";

const conversationScehma=new mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
    }]
},{
    timestamps:true
})

const ConversationModel=mongoose.model("Conversation",conversationScehma)
export default ConversationModel