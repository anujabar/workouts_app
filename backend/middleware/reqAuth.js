import jwt from "jsonwebtoken"
import { User } from "../models/userModel.js"
import { SECRET } from "../config.js"

const reqAuth=async (req,res,next)=>{
    const {authorization}=req.headers
    if(!authorization){
        return res.status(401).json({error:"Authorization token required"})
    }

    try{
        const token=authorization.split(" ")[1]
        const {_id}=jwt.verify(token,SECRET) //returns payload with _id
        req.user=await User.findOne({_id}).select("_id")
        next()
    }
    catch(error){
        console.log(error.message)
        res.status(401).json({error:"Request not Authorized"})
    }
}

export default reqAuth