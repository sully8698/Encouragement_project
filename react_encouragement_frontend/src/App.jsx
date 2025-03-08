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

import './styles/App.css';

import './styles/navbar.css'
import './styles/signup.css'
import thumb from './images/thumb.svg'

function App() {

  const [formData, setFormData] = useState({ 
                                    username: '', 
                                    password: '',
                                    first_name: '',
                                    last_name: '',
                                    email: '',
                                    phone_number: '+1',
                                    message_hour: '',
                                    timezone: ''
  });
  const [userToken, setUserToken] = useState(() => localStorage.getItem('Token') || '')

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone_number"){
      let updatedValue = value;

      if (!updatedValue.startsWith('+1')) {
        updatedValue = '+1' + updatedValue.replace(/^\+1?/, ''); // ensures only one "+1" added
      }

      setFormData({
        ...formData,
        [name]: updatedValue,
      });

    }else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

  };

  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    setUserToken(token)
    localStorage.setItem('Token', token)
  }

  return (
      <>
        <Router>
          <tokenContext.Provider value={{userToken, setUserToken}}>
            <div className="logo">
                    <img src={thumb} className='thumbImg' alt="Thumbs Up" />
            </div>
            <Navbar />
            <div className='title'>
              <span>ENCOURAGEMENT</span>
            </div>
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
