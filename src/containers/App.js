import React, {Component} from "react";
import GoogleButton from "react-google-button";
import { Link, Routes, Route } from 'react-router-dom';
import { LoginSuccess } from "./LoginSuccess";

const redirectToGoogleSSO = async () => {
    const googleLoginURL = "http://localhost:5000/api/authn/login/google";
    const newWindow = window.open(googleLoginURL, "_blank", "width=500, height=600");
}

class App extends Component {

    constructor() {
        super()
        this.state = {
          users: [],
        }
    }

    /*
    componentDidMount(){
        fetch('http://localhost:5000/api/authz/allusers')
            .then(response=> response.json())
            .then(listusers => this.setState({users: listusers}))
    }
    */

    /*
    <h2>Get All Users</h2>
    <p>{JSON.stringify(this.state)}</p>
    */
    
    render(){
        return (
            <div>
                <Routes>  
                    <Route exact path ="/" element={
                        <div>
                            <p>Welcome Home !</p>
                            <Link to="/login/google">Login with Google</Link>
                            <Link to="/login/locally">Login locally</Link>
                            <Link to="/login/idms">Login with IDMS</Link>
                        </div>
                    }>
                    </Route>  
                    <Route exact path ="/login/google" element={<GoogleButton onClick={redirectToGoogleSSO}/>}></Route>
                    <Route exact path ="/login/locally" element={<GoogleButton onClick={redirectToGoogleSSO}/>}></Route>
                    <Route exact path ="/login/idms" element={<GoogleButton onClick={redirectToGoogleSSO}/>}></Route>
                    <Route exact path ="/login/success" element={<LoginSuccess/>}></Route>
                    <Route exact path ="/login/error" element={<div>Login error</div>}></Route>
                </Routes>
            </div>
        )
    }
}

export default App;