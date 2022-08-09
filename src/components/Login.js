import React from 'react'

const Login = () => {
  
  fetch('http://localhost:8080/api/users/auth/login/google')
    .then(response => response.text())
    .then(url => {window.location = url})
  }

export default Login