import ConversationModel from "../models/conversationModel.js"
import MessageModel from "../models/messageModel.js"

class MessageController {

    static getMessages = async (req, res) => {
       try{
        const receiverId=req.params.id;
        const senderId=req.id;

        const conversation=await ConversationModel.findOne({
            participants:{$all:[senderId,receiverId]}

        }).populate("messages")
        res.status(200).json({
            msg:"conversation found",
            data:conversation?.messages||[]
        })
       }catch(err){
        res.status(400).json({
            msg:"some error finding coversation",
        })
       }
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