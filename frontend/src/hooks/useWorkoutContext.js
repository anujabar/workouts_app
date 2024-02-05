import { WorkoutContext } from "../context/WorkoutContext.js";
import {useContext} from "react"

export const useWorkoutContext=()=>{
    const context=useContext(WorkoutContext)

    return context
}