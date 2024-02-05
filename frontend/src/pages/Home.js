import React,{useState,useEffect} from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext.js"
import WorkoutForm from "../components/WorkoutForm.js"
import axios from "axios"
import WorkoutDetails from "../components/WorkoutDetails.js"
import { useAuthContext } from "../hooks/useAuthContext.js"

const Home = () => {
  const {workouts,dispatch}=useWorkoutContext()
  const {user}=useAuthContext()
  useEffect(()=>{ //cannot make this async
    const fetchWorkouts=async ()=>{
        const response=await fetch("http://localhost:4000/api/workouts",{
        method:"GET",
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
        })
        const result=await response.json() //converts json to javascript object
        if(response.ok){
            dispatch({type:"SET_WORKOUTS",payload:result.data})
        }
    }
    if(user){
        fetchWorkouts()
    }
    // axios
    // .get("http://localhost:4000/api/workouts")
    // .then((response)=>{
    //     setWorkouts(response.data.data) //response.data is a javascript object in axios
    //     console.log(response.data)
    // })
    // .catch((error)=>{
    //     console.log(error.message)
    // })
  },[])
  return (
    <div className="home">
        <div>
            {workouts && workouts.map((workout,index)=>{
                return (<WorkoutDetails key={workout._id} workout={workout}/>)
            }
            )}
        </div>
      <WorkoutForm/>
    </div>
    
  )
}

export default Home
