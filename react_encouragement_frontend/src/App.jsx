import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Home from './pages/home';
import Profile from './pages/profile';
import tokenContext from './contexts/tokenContext';
import Landing from './pages/landing';
import Logout from './components/logout';

import './App.css';


function App() {

  const [formData, setFormData] = useState({ 
                                    username: '', 
                                    password: '',
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    phone_number: '',
                                    message_hour: '',
                                    timezone: ''
  });
  const [userToken, setUserToken] = useState(() => localStorage.getItem('Token') || '')

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
    localStorage.setItem('Token', token)
  }

  return (
      <>
        <Router>
          <div className='title'>ENCOURAGMENT</div>
          <tokenContext.Provider value={{userToken, setUserToken}}>
            <Navbar />
            <Routes>
              <Route path='/' element={<Landing />}/>
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<SignUp handleInputChange={handleInputChange} formData={formData} /> } /> 
              <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </tokenContext.Provider>
        </Router>     
      </>
    
  )
}

export default App
