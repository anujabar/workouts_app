import mongoose from "mongoose"

const workoutSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
},
{
    timestamps:true
}
)

export const Workout=mongoose.model("workout",workoutSchema) //Workout is the model, workout is the collection, an instance of the model is a document in the collection based off the schema