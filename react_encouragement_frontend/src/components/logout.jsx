import { useContext, useState } from "react"
import tokenContext from "../contexts/tokenContext"
import { Navigate } from "react-router-dom"
import Landing from "../pages/landing"
import Home from "../pages/home"


export default function Logout(){

    const userToken = useContext(tokenContext)
    
    const [shouldRedirect, setShouldRedirect] = useState(null)

    const handleLogout = () =>{
        userToken.setUserToken(null)
        setShouldRedirect(true)
    }

    const handleCancel = () => {
        setShouldRedirect(false)
    }

    if (shouldRedirect === false){
        return <Navigate to={"/home"} />
    } else if (shouldRedirect === true){
        localStorage.removeItem("Token")
        
        return <Navigate to={"/"} />
    }

    return (
        <>
            <p>Are you sure you wish to logout?</p>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleLogout} >Confirm</button>
        
        </>
    )

}