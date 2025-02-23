import { useState, useContext } from 'react';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Home from './pages/home';
import tokenContext from './contexts/tokenContext';
import Logout from './components/logout';

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
      <>
        <Router>
          <div className='title'>ENCOURAGMENT</div>
          <tokenContext.Provider value={{userToken, setUserToken}}>
            <Navbar />
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/signup" element={<SignUp handleInputChange={handleInputChange} formData={formData} /> } /> 
              <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} handleToken={handleToken} />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </tokenContext.Provider>
          {userToken === null && (
            <div className="home-page-paragraph">
                <ul>
                    <li>Random text messages got you down?</li>
                    <li>Wish the random message didnt have a hidden agenda for once?</li>
                    <li>Feel phantom vibrations from your cell phone in your pocket due to excessive random text messages?</li>
                    <li>Need some encouragment to start your day off right?</li>
                </ul>
                <p>
                    Then you found a fun solution here? The primary purpose of the Encouragement 
                    website is to provide you with an encouraging sentence to help improve your 
                    mood and tackle the day! Everyone needs a "pick-me-up" now and then, 
                    and you are an amazing, insightful individual with so much to offer—you 
                    are worth it."
                </p>
            </div>)}
        </Router>     
      </>
    
  )
}

export default App
