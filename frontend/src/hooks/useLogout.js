import { useAuthContext } from "./useAuthContext.js";
import { useWorkoutContext } from "./useWorkoutContext.js";

export const useLogout=()=>{
    const {dispatch}=useAuthContext() //destructure
    const {dispatch:workoutDispatch}=useWorkoutContext() //rename

    const logout=()=>{

        localStorage.removeItem("user")
        dispatch({type:"LOGOUT"})
        workoutDispatch({type:"SET_WORKOUTS",payload:null})
    }
    return {logout} //js object
}