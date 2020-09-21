import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../../css/Home.css'

class SetupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailExists : false,
            invalidCredentials: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        if (this.props.register){
            var name = e.target[0].value
            var password = e.target[2].value
            var email = e.target[1].value
        }else{
            email = e.target[0].value
            password = e.target[1].value
        }
        const user = { name, password, email }
        const config = {
            headers: {
                'Content-Type':"application/json",
            }
        }
        const body = JSON.stringify(user)
        if(this.props.register){
            try{
                axios.post('/api/user', body, config).then(res => {
                    const token = res.data.token
                    window.localStorage.setItem('job-auth',token)
                    this.props.history.push('/jobs')
                }).catch(err => {
                    this.setState({
                        emailExists : true
                    })
                    }
                )
            }catch(e){
                window.alert("Some Error Occured")
            }
        }else{
            try{
                axios.post('/api/auth', body, config).then(res => {
                    const token = res.data.token
                    window.localStorage.setItem('job-auth', token)
                    this.props.history.push('/jobs')
                }).catch(e => {
                    this.setState({
                        invalidCredentials: true
                    })
                }
                )
            }catch(e){
                window.alert("Some Error Occured")
            }
        }
    }
   componentDidMount() {
        if(window.localStorage.getItem('job-auth')) {
            this.props.history.push('/jobs')
        }
   }
    render() {
        return (
        <div className='Home'>
            <div className = 'Home-card'>
                <div className='Home-card--header'>
                    <h1>Welcome to Jobs Portal</h1>
                    <p>We provide world wide job data</p>
                </div>
                <section>
                    <form onSubmit={this.handleSubmit} method='POST' className='Home-card--form'>
                        {this.props.register && <input type='text' name='name' id='name' placeholder='John Doe' />}
                        <input type='email' name='email' id='email' placeholder='John@host.ltd' />
                        <input type='password' name='password' id='password' placeholder='Password' />
                        {
                            this.props.register && this.state.emailExists && (<span className='Err-msg'>Email Already Exists</span>)
                        }
                        {
                            this.props.login && this.state.invalidCredentials && (<span className='Err-msg'>Invalid Credentials</span>)
                        }
                        <div className='Home-card--button'>
                            {this.props.register && <button type='submit'>Register</button>}
                            {this.props.login ? <button type='submit'>Login</button> : <Link to='/login'>Login</Link>}
                        </div>
                    </form>
                </section>
            </div>
        </div>
        )
    }
}



export default SetupForm