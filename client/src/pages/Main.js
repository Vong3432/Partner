import React, { Component } from 'react'
import axios from 'axios'

class Main extends Component {

    state = {
        data: []
    }

    componentDidMount()
    {
        axios
            .get('/api/job/displayjobs/"Software"',{headers: {"Content-type": "application/json"}})                     
            .then( res => this.setState({
                data: res.data 
            }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                {this.state.data ? console.log(this.state.data) : console.log('nothing')}
                <p>Main layout</p>
            </>
        )
    }
}

export default Main;
