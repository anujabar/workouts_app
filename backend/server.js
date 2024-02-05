import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import {PORT,mongdbURL} from "./config.js"
import bodyParser from "body-parser"
import workoutRoutes from "./routes/workouts.js"
import userRoutes from "./routes/users.js"

const app=express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api/workouts",workoutRoutes) //tells express to use the workoutRoutes middleware for routes ending in /api/workouts+...
app.use("/api/users",userRoutes)
app.use((req,res,next)=>{ //custom middleware
    console.log(req.path)
    console.log(req.method)
    next()
})


app.get("/",(req,res)=>{
    res.send("Hello")
})

mongoose.connect(mongdbURL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})
