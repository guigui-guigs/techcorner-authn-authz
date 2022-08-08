import React, {Component} from "react";
import GoogleButton from "react-google-button";
import { Link, Routes, Route } from 'react-router-dom';
import { LoginSuccess } from "./LoginSuccess";

import Logout from "../components/LogoutButton";
import LogoutButton from "../components/LogoutButton";
import TestApi from "../components/TestApi";

const redirectToGoogleSSO = async () => {
    const googleLoginURL = "http://localhost:8080/api/authn/login/google";
    const newWindow = window.open(googleLoginURL, "_blank", "width=500, height=600");
}

class App extends Component {

    constructor() {
        super()
        this.state = {
          users: [],
        }
    }

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
                    <Route exact path ="/login/google" element={
                        <div>
                            <GoogleButton onClick={redirectToGoogleSSO}/>
                            <LogoutButton/>
                            <TestApi/>
                        </div>
                    }></Route>
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