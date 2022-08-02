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
                            <Link to="/login">Login</Link>
                        </div>
                    }>
                    </Route>  
                    <Route exact path ="/login" element={<GoogleButton onClick={redirectToGoogleSSO}/>}></Route>
                    <Route exact path ="/login/success" element={<LoginSuccess/>}></Route>
                </Routes>
            </div>
        )
    }
}

export default App;