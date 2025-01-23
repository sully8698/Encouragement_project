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
    return [uname, pword]
  }
  
  const createHtmlElement = (apiObj, tagElement) => { // currently adds to the h3 element on html
    const h3element = document.createElement("h3")
    h3element.innerText = apiObj

    for (let elem of [h3element]) {
        tagElement.appendChild(elem)
    }

  }

  const writeEncouragementApiResults = async (body) => { // currently grabs all sentences in the sentence data base
    const h3 = document.querySelector("#getinfo")
    console.log(body)
    if(body.length > 0) {
        h3.innerText = ""
        randomint = Math.floor(Math.random() * (body.length))
        console.log(randomint)
        createHtmlElement(body[randomint]['fields']['sentence'], h3) //adds h3 elements with the sentence text in it
        
    } else {
        h3.innerHTML = "you must log in first"
    }
  }

  const handleAuth = async (e) => {
    e.preventDefault()
    const [uname, pword] = getCredentials(e)
    const checkbox = document.querySelector("#signup")
    if(checkbox.checked) {
      signUp(uname, pword)
    } else {
        const token = await getToken(uname, pword)
        localStorage.setItem("token", token)
    }
  }
  
  // makes a POST request to create an account
  const signUp = (uname, pword) => {
    const data = {username: uname, password: pword}
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
      },
      body: JSON.stringify(data)
    }
    basicFetch("http://127.0.0.1:8000/encouragement/accounts/signup", context)
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

    form.onsubmit = (e) => handleAuth(e)
    getinfo.onclick = async () => {
        const body = await fetchResults()
        writeEncouragementApiResults(body)
    }
    logout.onclick = () => localStorage.removeItem("token")
  }