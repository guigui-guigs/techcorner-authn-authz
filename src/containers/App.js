import React, {Component} from "react";

class App extends Component {

    constructor() {
        super()
        this.state = {
          users: [],
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/api/authz/allusers')
            .then(response=> response.json())
            .then(listusers => this.setState({users: listusers}))
    }
    
    render(){
        return (
            <div>
                <h2>Get All Users</h2>
                <p>{JSON.stringify(this.state)}</p>
            </div>
        )
    }
}

export default App;