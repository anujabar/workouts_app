import axios from "axios"
import { useEffect,useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext.js"
import { useAuthContext } from "../hooks/useAuthContext.js"

const WorkoutForm = () => {
    const {dispatch}=useWorkoutContext()
    const [title,setTitle]=useState("")
    const [load,setLoad]=useState("")
    const [reps,setReps]=useState("")
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields]=useState(null)
    const {user}=useAuthContext()
    const handleSubmit=async (e)=>{
        e.preventDefault() //by default page refreshes on submit
        if(!user){
            setError("You must be logged in")
            return
        }
        const data={
            title:title,
            load:load,
            reps:reps
        }
        const response=await fetch("http://localhost:4000/api/workouts",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${user.token}`
            }
        })
        const result=await response.json() //converts json to javascript object
        if(!response.ok){
            setError(result.message)
            setEmptyFields(result.emptyFields)
        }
        if(response.ok){
            setTitle("")
            setLoad("")
            setReps("")
            setError(null)
            setEmptyFields(null)
            dispatch({type:"CREATE_WORKOUT",payload:data})
        }
        // axios
        // .post("http://localhost:4000/api/workouts",data)
        // .then((response)=>{ 
        //     if(response){ // if the response is ok
        //         setError(null)
        //         setTitle("")
        //         setLoad("")
        //         setReps("")
        //         console.log(response.data) //response.data is a javascript object in axios
        //     }
        // })
        // .catch((error)=>{
        //     setError(error.message)
        //     console.log(error)
        // })
    }
  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input className={emptyFields && emptyFields.includes("title")?"error":""} type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
            <label>Load (kg)</label>
            <input className={emptyFields && emptyFields.includes("load")?"error":""} type="number" value={load} onChange={(e)=>{setLoad(e.target.value)}}/>
            <label>Reps</label>
            <input className={emptyFields && emptyFields.includes("reps")?"error":""} type="number" value={reps} onChange={(e)=>{setReps(e.target.value)}}/>
            <button>Save</button>
        </form>
        {error && <div className="error">{error}</div>}
    </div>
  )
}

export default WorkoutForm
