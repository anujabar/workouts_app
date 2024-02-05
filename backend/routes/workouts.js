import express from "express"
import mongoose from "mongoose"
import {Workout} from "../models/workoutModel.js"
import reqAuth from "../middleware/reqAuth.js"


const router=express.Router()

router.use(reqAuth)

router.get("/",async (req,res)=>{
    try{
        const user_id=req.user._id
        const ws=await Workout.find({user_id}).sort({createdAt:-1}) //sorts by createdAt in descending order i.e. new record 1st
        res.status(200).json({
            count:ws.length,
            data:ws
        })
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
router.get("/:id",async (req,res)=>{ // :something means path parameters
    try{
        const id=req.params.id //for path parameters
        const result=await Workout.findById(id)
        if(!result){
            return res.send(404).json({message:"No such workout"})
        }
        res.status(200).json(result)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
router.post("/",async (req,res)=>{
    try{
        const emptyFields=[]
        if(!req.body.title){
            emptyFields.push("title")
        }
        if(!req.body.reps){
            emptyFields.push("reps")
        }
        if(!req.body.load){
            emptyFields.push("load")
        }
        if(emptyFields.length>0){
            return res.status(400).json({message:"all fields are required",emptyFields:emptyFields}) //sends json response
        }
        const newWorkout={
            title:req.body.title,
            reps:req.body.reps,
            load:req.body.load,
            user_id:req.user._id
        }
        const w=await Workout.create(newWorkout)
        res.status(200).json(w)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
router.put("/:id",async (req,res)=>{
    try{
        if (!req.body.title || !req.body.reps || !req.body.load){
            return res.status(400).json({message:"All fields are required"})
        }
        const id=req.params.id
        const result=await Workout.findByIdAndUpdate(id,req.body)
        if(!result){
            return res.status(404).json({message:"No such workout"})
        }
        res.status(200).send("Workout Updated")
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
router.delete("/:id",async (req,res)=>{
    try{
        const id=req.params.id
        const result=await Workout.findByIdAndDelete(id)
        if(!result){
            return res.send(404).json({message:"No such workout"})
        }
        res.status(200).json(result)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

export default router