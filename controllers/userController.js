import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt"


class UserController {

    static register = async (req, res) => {
        try {
            const { username, email, password, gender } = req.body

            const isUser = await UserModel.findOne({ $or: [{ email }, { username }] })
            if (isUser) {
                return res.status(401).json({
                    msg: "username or email already exist"
                })
            }
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hashSync(password, salt)

            let boyImage = `https://avatar.iran.liara.run/public/boy?username=${username}`
            let girlImage = `https://avatar.iran.liara.run/public/girl?username=${username}`

            let img = "";
            if (gender === "male") {
                img = boyImage;
            } else {
                img = girlImage;
            }


            const newUser = new UserModel({
                username, email, password: hashPass,
                profileImg: img, gender
            })

            const isCreated = await newUser.save();

            console.log(isCreated)

            if (isCreated) {
                return res.status(201).json({
                    msg: "account created"
                })
            }


        } catch (err) {

            console.log(err)
           return res.status(400).json({
                msg:"account not created",
            
            })

        }
        // res.send("resgister working")

    }

    static login = async (req, res) => {
        console.log(req.body)
        res.send("login working")
    }


}

export default UserController