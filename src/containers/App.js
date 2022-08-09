import React, {Component} from "react";
import GoogleButton from "react-google-button";
import { Link, Routes, Route } from 'react-router-dom';

import Logout from "../components/LogoutButton";
import LogoutButton from "../components/LogoutButton";
import Login from "../components/Login";
import TestApi from "../components/TestApi";

class App extends Component {

    render(){
        return (
            <div>
                <Routes>  
                    <Route exact path ="/" element={
                        <div>
                            <p>Welcome Home !</p>
                            <Link to="/login/google">Login with Google</Link>
                        </div>
                    }>
                    </Route>  
                    <Route exact path ="/login/google" element={
                        <div>
                            <GoogleButton onClick={Login}/>
                            <LogoutButton/>
                            <TestApi/>
                        </div>
                    }></Route>
                </Routes>
            </div>
        )
    }
}

export default App;