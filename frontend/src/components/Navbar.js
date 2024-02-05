import {Link} from "react-router-dom"
import { useLogout } from "../hooks/useLogout.js"
import { useAuthContext } from "../hooks/useAuthContext.js"

const Navbar = () => {
  const {logout}=useLogout() //destructure
  const {user}=useAuthContext()
  const handleClick=()=>{
    logout()
  }  

  return (
    <header>
        <div className='container'>
            {/* Link is like anchor tag */}
            <Link to="/">
                <h1>Workout Buddy</h1>
            </Link>
            <nav>
                {user?
                <div>
                    <span>{user.email}</span>
                    <button onClick={handleClick}>Log out</button>
                </div>
                :<div>
                    <Link to="/signup">
                        Sign Up
                    </Link>
                    <Link to="/login">
                        Log in 
                    </Link>
                </div>}
            </nav>
        </div>
    </header>
  )
}

export default Navbar
