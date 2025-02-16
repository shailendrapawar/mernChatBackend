import UserModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

class UserController {

    static register = async (req, res) => {
        try {

            const { username, email, password, gender } = req.body

            if (!username || !gender || !password || !email) {
                return res.status(401).json({
                    msg: "enter all credentials"
                })
            }

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

            if (isCreated) {
                return res.status(201).json({
                    msg: "account created"
                })
            }
        } catch (err) {
            console.log(err)
            return res.status(400).json({
                msg: "account not created",
            })
        }
        // res.send("resgister working")

    }

    static login = async (req, res) => {

        try {

            const { identifier, password } = req.body;

            const isUser = await UserModel.findOne({ $or: [{ email: identifier }, { username: identifier }] });
            if (!isUser) {
                return res.status(401).json({
                    msg: "User does'nt exist"
                })

            } else {
                // console.log(isUser)
                const isCorrect = await bcrypt.compareSync(password, isUser.password)

                if (!isCorrect) {
                    return res.status(400).json({
                        msg: "invalid credentials"
                    })
                }

                const tokenSecretKey = process.env.TOKEN_SECRET
                const tokenData = {
                    userId: isUser._id
                }
                const token = await jwt.sign(tokenData, tokenSecretKey, { expiresIn: "3d" })

                return res.status(200).json({
                    msg: "login successfully",
                    token: token,
                    user: {
                        id:isUser._id,
                        username:isUser.username,
                        profile:isUser.profileImg,
                        email:isUser.email
                    }
                })
            }
        } catch (err) {
            console.log(err)

            return res.status(401).json({     
                msg: "Something went wrong"
            })

        }






    }


}

export default UserController