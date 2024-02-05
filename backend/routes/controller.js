import { Workout } from "../models/workoutModel";

const createWorkout=async (req,res)=>{
    try{
        if (!req.body.title || !req.body.reps || !req.body.load){
            res.status(400).json({message:"All fields are required"})
        }
        const newWorkout={
            title:req.body.title,
            reps:req.body.rep,
            load:req.body.load
        }
        const w=await Workout.create(newWorkout)
        res.status(200).send(w)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

export {createWorkout}