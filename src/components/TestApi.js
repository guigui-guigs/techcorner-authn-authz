import React from 'react'

const Api = () => {
    fetch('http://localhost:8080/api/users/authz/allusers', {
        credentials: 'include', // Don't forget to specify this if you need cookies
    })
}

const TestApi = () => {
    return (<button onClick={Api}>Test API GET all users</button>)
  }

export default TestApi