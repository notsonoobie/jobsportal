import React, { Component } from 'react'
import axios from 'axios'
import NavBar from '../Layout/NavBar'
import Job from '../Layout/Job'
import '../../css/Jobs.css'

class Jobs extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            token : window.localStorage.getItem('job-auth'),
            name: '',
            email: ''
        }
        this.handleLogout = this.handleLogout.bind(this)
    }
    handleLogout(){
        window.localStorage.removeItem('job-auth')
        this.props.history.push('/')
    }
    componentDidMount(){
        if(!this.state.token){
            this.props.history.push('/')
        }else{

            const config = {
                headers: {
                    'x-auth-token': this.state.token
                }
            }
            axios.get('http://localhost:5000/api/auth', config).then(res => {
                this.setState({
                    name: res.data.name,
                    email: res.data.email
                })
            })
        }
    }
    
    render() {
        return (
            <>
                <NavBar name={this.state.name} email={this.state.email} handleLogout={this.handleLogout} />
                <Job />
            </>
        )
    }
}

export default Jobs