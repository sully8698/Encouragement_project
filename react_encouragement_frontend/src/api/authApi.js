async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }

export async function signup(context) {
const payload = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    },
    body: JSON.stringify(context)
}

const response = await basicFetch("http://localhost:8000/encouragement/accounts/signup",payload)
return response
}

export async function login(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const response = await basicFetch("http://localhost:8000/encouragement/accounts/get-token", payload)
    return response.token
  }

export async function getUserInfo(token) {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  }

  const response = await basicFetch("http://localhost:8000/encouragement/accounts/", payload)
  return response 
}

export async function updateUser(token, context) {
  const payload = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify(context)
  }

  const response = await basicFetch("http://localhost:8000/encouragement/accounts/update", payload)
  
  return response
}

export async function deleteUser(token) {
  const payload = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  }

  const response = await basicFetch("http://localhost:8000/encouragement/accounts/delete", payload)

  return response
  
}

