import { Link } from "react-router-dom";
import { useContext } from "react";
import tokenContext from "../contexts/tokenContext";


export default function Navbar() {

    const { userToken } = useContext(tokenContext)
    
    return (
        <nav className="navbar">
            <ul className="link-items">
                {!userToken || userToken === '' ? (
                    <>
                        <li className="link">
                            <Link to={""}>Home Page</Link>
                        </li>
                        <li className="link">
                            <Link to={"/signup"}>Signup</Link>
                        </li>
                        <li className="link">
                            <Link to={"/login"}>Login</Link>
                        </li>
                    </>
                ) : (
                    <>  
                        <li className="link">
                            <Link to={"/home"}>Home Page</Link>
                        </li>
                        <li className="link">
                            <Link to={"/profile"}>Profile</Link>
                        </li>
                        <li className="link">
                            <Link to={"/logout"}>logout</Link>
                        </li>
                    </>
                )
                }
            </ul>
            
        </nav>
        
    );
}