import { getUserInfo, updateUser, deleteUser} from "../api/authApi"
import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import tokenContext from "../contexts/tokenContext"

import '../styles/profile.css'

export default function Profile() {
    
    const { userToken, setUserToken } = useContext(tokenContext)
    const [data, setData] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            console.log("getting data!!!")
            console.log(userToken)
            try {
                const response = await getUserInfo(userToken)
                setData(response) // Update state with fetched data
                console.log(response)
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }

        fetchUserData()
    }, [userToken])

    const handleDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your profile?")

        if (confirmation) {
            const response = await deleteUser(userToken)
            console.log(response)
            alert('Your profile has been deleted')
            localStorage.removeItem("Token")
            setUserToken('')
            navigate("/")
            
        } else {
            alert('Profile deletion canceled')
            setShouldRedirect(false)
        }
        
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        console.log("Data before update:", data)

        const context = { 
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone_number: data.phone_number,
            message_hour: data.message_hour,
            timezone: data.timezone,
        }

        try{
            await updateUser(userToken, context)
            const getData = await getUserInfo(userToken)
            setData(getData)
            
            setShowForm(false)
            
        } catch (error){
            console.error('Error updating user:', error);
            alert('Error updating profile');
        }

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };

    return(
        <>
        {data ? (
            <>
                <h2>Current Info</h2>
                <div className="profile-info">
                    <h3>Name: {data.first_name} {data.last_name}</h3>
                    <h3>Phone Number: {data.phone_number}</h3>
                    <h3>Email: {data.email}</h3>
                    <h3>Encouragement scheduled for: {data.message_hour}:00, {data.timezone} time zone</h3>
                </div>
                {showForm ? (
                    <>
                        <form onSubmit={handleUpdate}>
                            <button type="submit">Save</button>
                            <div className="form-group">
                                <label htmlFor="first_name">First Name: </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    value={data.first_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name: </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    value={data.last_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email: </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number: </label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    value={data.phone_number}
                                    onChange={handleInputChange}
                                    />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message_hour">Message schedule: </label>
                                <select name="message_hour" id="message_hour" value={data.message_hour} onChange={handleInputChange}>
                                    <option value="9">Select a time</option>
                                    <option value="1">1:00 AM</option>
                                    <option value="2">2:00 AM</option>
                                    <option value="3">3:00 AM</option>
                                    <option value="4">4:00 AM</option>
                                    <option value="5">5:00 AM</option>
                                    <option value="6">6:00 AM</option>
                                    <option value="7">7:00 AM</option>
                                    <option value="8">8:00 AM</option>
                                    <option value="9">9:00 AM</option>
                                    <option value="10">10:00 AM</option>
                                    <option value="11">11:00 AM</option>
                                    <option value="12">12:00 AM</option>
                                    <option value="13">1:00 PM</option>
                                    <option value="14">2:00 PM</option>
                                    <option value="15">3:00 PM</option>
                                    <option value="16">4:00 PM</option>
                                    <option value="17">5:00 PM</option>
                                    <option value="18">6:00 PM</option>
                                    <option value="19">7:00 PM</option>
                                    <option value="20">8:00 PM</option>
                                    <option value="21">9:00 PM</option>
                                    <option value="22">10:00 PM</option>
                                    <option value="23">11:00 PM</option>
                                    <option value="0">12:00 PM</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="timezone">timezone: </label>
                                <select name="timezone" id="timezone" value={data.timezone} onChange={handleInputChange}>
                                    <option value="America/Los_Angeles">Pacific Standard Time (PST) - UTC -8:00</option>
                                    <option value="America/Denver">Mountain Standard Time (MST) - UTC -7:00</option>
                                    <option value="America/Chicago">Central Standard Time (CST) - UTC -6:00</option>
                                    <option value="America/New_York">Eastern Standard Time (EST) - UTC -5:00</option>
                                    <option value="America/Halifax">Atlantic Standard Time (AST) - UTC -4:00</option>
                                    <option value="Pacific/Honolulu">Hawaii-Aleutian Standard Time (HST) - UTC -10:00</option>
                                    <option value="America/Anchorage">Alaska Standard Time (AKST) - UTC -9:00</option>
                                    <option value="America/Los_Angeles">Pacific Daylight Time (PDT) - UTC -7:00 (During Daylight Saving Time)</option>
                                    <option value="America/Denver">Mountain Daylight Time (MDT) - UTC -6:00 (During Daylight Saving Time)</option>
                                    <option value="America/Chicago">Central Daylight Time (CDT) - UTC -5:00 (During Daylight Saving Time)</option>
                                    <option value="America/New_York">Eastern Daylight Time (EDT) - UTC -4:00 (During Daylight Saving Time)</option>
                                    <option value="America/Halifax">Atlantic Daylight Time (ADT) - UTC -3:00 (During Daylight Saving Time)</option>
                                    <option value="UTC">Coordinated Universal Time (UTC) - UTC 0:00</option>
                                </select>
                            </div>
                        </form>        
                    </>
                ) : (
                    <>
                        <button onClick={() => handleDelete()} style={{backgroundColor:"Red"}}>Delete Profile</button>
                        <button type="button" onClick={() => setShowForm(true)}>Update Profile</button> 
                    </>
                )}
            </>
        ) : (
            <p>Loading Profile info.....</p>
        )} 

        </>
    )
}