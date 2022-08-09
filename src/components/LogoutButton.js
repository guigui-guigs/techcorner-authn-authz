import React from 'react'

const Logout = () => {
  fetch('http://localhost:8080/api/users/auth/logout', {
      credentials: 'include', // Don't forget to specify this if you need cookies
  })
    .then(response=> response.json())
}

const LogoutButton = () => {
  return (<button onClick={Logout}>Logout</button>)
}

export default LogoutButton