import { Link } from "react-router-dom";
import { useContext } from "react";
import tokenContext from "../contexts/tokenContext";

export default function Navbar() {

    const userToken = useContext(tokenContext)
    
    return (
        <>
            <ul className="navbar">
                {userToken.userToken === null ? (
                    <>
                        <li>
                            <Link to={""}>Home Page</Link>
                        </li>
                        <li>
                        <Link to={"/signup"}>Signup</Link>
                        </li>
                        <li>
                        <Link to={"/login"}>Login</Link>
                        </li>
                    </>
                ) : (
                    <>  
                        <li>
                            <Link to={"/home"}>Home Page</Link>
                        </li>
                        <li>
                            <Link to={"/logout"}>logout</Link>
                        </li>
                    </>
                )
                }
            </ul>
        </>
    );
}