import { getUserInfo, updateUser, deleteUser} from "../api/authApi"
import { useNavigate } from "react-router-dom"
import { useState, useContext, useEffect } from "react"
import tokenContext from "../contexts/tokenContext"


export default function Profile() {
    
    const { userToken, setUserToken } = useContext(tokenContext)
    const [data, setData] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getUserInfo(userToken)
                setData(response) // Update state with fetched data
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }

        fetchUserData()
    }, [userToken])
    
    

    {/* need logic on this page to select a time, this will need to update the backend with PUT method
        backened still needs a spot to contain a time in the database per user account
        backened still needs a PUT method endpoint to change the time stored on user account */}

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
        console.log(data)
            e.preventDefault()
            const context = { 
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_number: data.phone_number
            }
            console.log(context)
            
            await updateUser(userToken, context)
            const getData = await getUserInfo(userToken)
            setData(getData)
            
            setShowForm(false)
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
                <button onClick={() => handleDelete()}>Delete Profile</button>
                <div className="profile-info">
                    <h3>Name: {data.first_name} {data.last_name}</h3>
                    <h3>Phone Number: {data.phone_number}</h3>
                    <h3>Email: {data.email}</h3>
                </div>
                {showForm ? (
                    <>
                        <form onSubmit={handleUpdate}>
                            <button type="submit">Update Profile</button>
                            {/* <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={""} 
                                    onChange={handleInputChange}
                                />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    value={data.first_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    value={data.last_name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone_number">Phone Number</label>
                                <input
                                    type="text"
                                    name="phone_number"
                                    id="phone_number"
                                    value={data.phone_number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            
                        </form>        
                    </>
                ) : (   
                    <button type="button" onClick={() => setShowForm(true)}>Update Profile</button> 
                )}
            </>
        ) : (
            <p>Loading Profile info.....</p>
        )} 

        </>
    )
}