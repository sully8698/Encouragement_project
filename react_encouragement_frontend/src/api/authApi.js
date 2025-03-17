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

const response = await basicFetch("http://3.145.54.136:8000/encouragement/accounts/signup",payload)
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
    const response = await basicFetch("http://3.145.54.136:8000/encouragement/accounts/get-token", payload)
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

  const response = await basicFetch("http://3.145.54.136:8000/encouragement/accounts/", payload)
  console.log(response)
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

  const response = await basicFetch("http://3.145.54.136:8000/encouragement/accounts/update", payload)
  
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

  const response = await basicFetch("http://3.145.54.136:8000/encouragement/accounts/delete", payload)

  return response
  
}

export async function changePassword(token, context) { // context = {old_password, new_password1, new_password2}
  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
    body: JSON.stringify(context)
  }

  try{

    const response = await basicFetch("http://3.145.54.136:8000/encouragement/accounts/password_change", payload)
    
    if (!response.ok) {
      throw new Error("Password change failed, please try again.")
    }
  
    const data = await response.json()
  
    return data
  } catch(error) {
    console.log(error)
    throw error
  }
}

export async function resetPassword(email) {
  try {
      const response = await fetch("http://3.145.54.136:8000/encouragement/accounts/password_reset", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
      });

      if (!response.ok) {
          throw new Error("Password reset failed, please try again.");
      }

      const data = await response.json();
      return { success: true, data }; // success response
  } catch (error) {
      console.error("Password reset error:", error);
      return { success: false, error: error.message || "Something went wrong!" }; // error response
  }
}

export async function resetPasswordConfirm(uidb64, token, password, confirmPassword) {
  const payload = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          new_password1: password,
          new_password2: confirmPassword,
      }),
  };

  try {
      const response = await fetch(`http://3.145.54.136:8000/encouragement/accounts/reset/${uidb64}/${token}/`, payload);
      console.log(response.status, response.headers.get('Location'));

      if (response.ok) {
          return { success: true }; // On success, return a success flag
      } else {
          const data = await response.json();
          console.log('Error data from server:', data);  // Log the entire error data

          // Process errors object
          if (data.errors) {
              // Collect error messages from the 'errors' object
              const errorMessages = Object.keys(data.errors)
                  .map((key) => data.errors[key].join(', '))  // Join multiple errors for each field
                  .join(', ');  // Join errors across fields
              return { success: false, error: errorMessages };
          }

          // If no structured errors found, return a generic error
          return { success: false, error: data.error || 'Something went wrong' };
      }
  } catch (error) {
      console.error('Error during password reset:', error);
      return { success: false, error: 'An error occurred while resetting the password.' };
  }
}
