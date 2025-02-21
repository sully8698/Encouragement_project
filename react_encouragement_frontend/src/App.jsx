import { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SignUp from './pages/signUp';
import Login from './pages/login';

import './App.css';



function App() {

  const [formData, setFormData] = useState({ 
                                    username: '', 
                                    password: '',
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    phone_number: '' 
  });
  const [userToken, setUserToken] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    setUserToken(token)
    
  }

  return (

      <Router>
        <Navbar />
        <Routes>
        <Route path="/signup" element={<SignUp handleInputChange={handleInputChange} formData={formData} /> } /> 
        <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} />} />
        </Routes>
      </Router>     
    
  )
}

export default App
