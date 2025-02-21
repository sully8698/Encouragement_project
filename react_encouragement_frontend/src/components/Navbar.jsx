import { Link } from "react-router-dom";
import { useContext } from "react";
import formContext from "../contexts/formContext";

export default function Navbar() {
    // need use state that removes login or logout button
    // pending if user is logged in or out
    // also sign up link should go away if user logged in

   
    

    return (
        <>
          <ul className="navbar">
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </>
    );
}