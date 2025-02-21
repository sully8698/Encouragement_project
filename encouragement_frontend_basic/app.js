// handles the fetch boilerplate
  const basicFetch = async (url, context) => {
    const response = await fetch(url, context)
    const body = await response.json()
    return body
  }
  
  // gets the username and password from an event
  const getCredentials = (e) => {
    const uname = e.target.uname.value
    const pword = e.target.password.value
    const fname = e.target.first_name.value
    const lname = e.target.last_name.value
    const email = e.target.email.value
    const phone_number = e.target.phone_number.value
    return [uname, pword, fname, lname, email, phone_number]
  }
  
  const createHtmlElement = (apiObj, tagElement) => { // currently adds to the h3 element on html
    const h3element = document.createElement("h3")
    h3element.innerText = apiObj

    for (let elem of [h3element]) {
        tagElement.appendChild(elem)
    }

  }

  const writeEncouragementApiResults = async (body) => { 
    console.log('Encouragement start')

    if(body.length > 0) {
        getinfo.innerText = ""
        randomint = Math.floor(Math.random() * (body.length))
        createHtmlElement(body[randomint]['fields']['sentence'], getinfo) //adds h3 elements with the sentence text in it
    } else {
        getinfo.innerHTML = "you must log in first"
    }
  }

  const deleteUser = async () => {
    const token = localStorage.getItem("token");  // Get the stored token
  
    if (!token) {
      console.error("No authentication token found.");
      return;
    }
  
    const response = await fetch("http://127.0.0.1:8000/encouragement/accounts/delete", {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${token}`,  // token for authorization
        "Content-Type": "application/json",
      }
    });
  
    if (response.status === 204) {
      console.log("User successfully deleted");
      localStorage.removeItem("token");  // Remove the token from localStorage
    } else {
      const error = await response.json();
      console.error("Failed to delete user:", error);
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    const [uname, pword, fname, lname, email, phone_number] = getCredentials(e)
    const checkbox = document.querySelector("#signup")
    if(checkbox.checked) {
      signUp(uname, pword, fname, lname, email, phone_number)
      
    } else {
        const token = await getToken(uname, pword)
        localStorage.setItem("token", token)
    }
  }
  
  // makes a POST request to create an account
  const signUp = (uname, pword, fname, lname, email, phone_number) => {
    const data = {username: uname, 
      password: pword, 
      first_name: fname, 
      last_name: lname, 
      email: email, 
      phone_number: phone_number
    }
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
      },
      body: JSON.stringify(data)
    }

    try {
      const response = basicFetch("http://127.0.0.1:8000/encouragement/accounts/signup", context);
      console.log("SignUp Response: ", response); 
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  }

  // trades a registered user's credentials for a token
  const getToken = async (uname, pword) => {
    const data = {username: uname, password: pword}
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    const body = await basicFetch("http://127.0.0.1:8000/encouragement/accounts/get-token", context)
    return body["token"]
  }

  const fetchResults = async () => {
    const token = localStorage.getItem("token")
    const context =   {
      method: "GET",
      headers: {
        "Content-Type": "application/json" ,
        "Authorization": `Token ${token}`
      }
    }
    return basicFetch("http://127.0.0.1:8000/encouragement/sentence/", context)
  }
  
  window.onload = () => {
    const form = document.querySelector("#form")
    const getinfo = document.querySelector("#getinfo")
    const logout = document.querySelector("#logout-btn")
    const delete_user = document.querySelector('#delete-btn')

    form.onsubmit = (e) => handleAuth(e)
    
    getinfo.onclick = async () => {
        const body = await fetchResults()
        writeEncouragementApiResults(body)
    }
    
    logout.onclick = () => localStorage.removeItem("token")
    
    delete_user.onclick = async () => {
      const body = await fetchResults()
      deleteUser(body)
      
    }

  }