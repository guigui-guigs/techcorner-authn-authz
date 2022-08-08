import React from 'react'

const Api = () => {
    fetch('http://localhost:8080/api/authz/allusers', {
        credentials: 'include', // Don't forget to specify this if you need cookies
    })
}

const TestApi = () => {
    return (<button onClick={Api}>Test API Get all users</button>)
  }

export default TestApi