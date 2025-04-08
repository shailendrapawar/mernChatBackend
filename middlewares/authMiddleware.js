import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"

const authmiddleware=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        // console.log("Cookies received:", req.cookies)
    if(!token){
        return res.status(401).json({msg:"user not authenticated"})
        // res.redire
    };
    const decode=await jwt.verify(token,process.env.TOKEN_SECRET)

    req.id=decode.userId
    // console.log(req.id)
    next()

    }catch(err){
        console.log(err)
        return res.status(401).json({msg:"internal server error"})
    }
}

export default authmiddleware