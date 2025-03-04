import SignupForm from "../components/signupForm";
import { useState } from 'react';
import { signup } from "../api/authApi";
import {Navigate} from 'react-router-dom';

export default function SignUp({handleInputChange, formData}) {

    const [responseMsg, setResponseMsg] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if (!formData.password || formData.password.trim() === "") {
        setResponseMsg("Password is required!");  
        return;  
      }

      const context = {
        username: formData.username, 
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number
        }

      const response = await signup(context)
      
      if(response.username && response.email && response.phone_number) {
        setShouldRedirect(true)
      } else {
        setResponseMsg(response.username)
      }
    }
  
    if (shouldRedirect) {
        return <Navigate to="/login"/>
    } else {
        return <SignupForm formType={"Signup"} handleInputChange={handleInputChange} formData={formData} handleSubmit={handleSubmit} responseMsg={responseMsg}/>
    }
  
  }