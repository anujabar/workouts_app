import React from 'react'
import axios from "axios"
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { useWorkoutContext } from '../hooks/useWorkoutContext.js'
import { useAuthContext } from '../hooks/useAuthContext.js'

const WorkoutDetails = ({workout}) => {
    const {dispatch}=useWorkoutContext()
    const {user}=useAuthContext()
    const handleClick=async ()=>{
        if(!user){
            return
        }
        const response=await fetch("http://localhost:4000/api/workouts/"+workout._id,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${user.token}`
        }
        })
        const result=await response.json() //converts json to js object
        if(response.ok){
            dispatch({type:"DELETE_WORKOUT",payload:result})
        }
    }
  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix:true})}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails
