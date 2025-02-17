import ConversationModel from "../models/conversationModel.js"
import MessageModel from "../models/messageModel.js"

class MessageController {

    
    static getMessages = async (req, res) => {
        res.send("send messsage working")
    }






    static sendMessage = async (req, res) => {
        try {
            const senderId = req.id
            const { message, receiverId } = req.body

            let gotCoversation = await ConversationModel.findOne({
                participants: { $all: [senderId, receiverId] }
            })

            //===============creation of conversation if it dosent exists====================================
            if (!gotCoversation) {
                gotCoversation = new ConversationModel({
                    participants: [senderId, receiverId],
                    messages: []
                })
            };


            //=================creation of new message===============================
            const newMessage = new MessageModel({
                message,
                senderId,
                receiverId,
            })

            // =================saving message=====================================
            const isCreated = await newMessage.save();

            if (isCreated) {
                gotCoversation.messages.push(isCreated._id)
            }

            //=================saving conversation=================
            const isSent = await gotCoversation.save()

            if (isSent) {
                return res.status(200).json({
                    msg: "message sent",
                    data: isCreated
                })
            }

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "messaeg not sent",
            })

        }
    }
}

export default MessageController