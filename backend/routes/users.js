import express from "express"
import {User} from "../models/userModel.js"
import jwt from "jsonwebtoken"
import { SECRET } from "../config.js"

const router=express.Router()

const createToken=(_id)=>{
    return jwt.sign({_id:_id},SECRET,{expiresIn:"3d"})
}

router.post("/login",async (req,res)=>{
    try{
        const user= await User.login(req.body.email,req.body.password)
        const token=createToken(user._id)
        res.status(200).json({email:req.body.email,token:token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.post("/signup",async (req,res)=>{
    try{
        const user=await User.signup(req.body.email,req.body.password)
        const token=createToken(user._id)
        res.status(200).json({email:req.body.email,token:token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})

export default router