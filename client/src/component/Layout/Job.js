import React, { Component } from 'react'
import axios from 'axios'
import JobList from './JobList'
import '../../css/Job.css'

class Job extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            token: window.localStorage.getItem('job-auth'),
            listOfJobs : []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(e){
        e.preventDefault()
        console.log(this.state.token)
        const description = e.target[0].value.toLowerCase()
        const location = e.target[1].value.toLowerCase()
        const isFullTime = e.target[2].value

        const payload = { description, location, isFullTime }
        const config = {
            headers: {
                'Content-Type': "application/json",
                'x-auth-token': this.state.token,
            }
        }
        const body = JSON.stringify(payload)
        axios.post('/jobs/data', body, config).then(res => {
            this.setState({
                listOfJobs: JSON.parse(res.data)
            })
        })
    }
    
    render() {
        return (
            <>
                <div className='JobSearch'>
                    <form onSubmit={this.handleSubmit} className='form'>
                        <input type='text' name='name' id='id' placeholder='Python / Java / Node ...' className='input-name' required />
                        <input type='text' name='country' id='country' placeholder='mumbai / sf / new york ...' className='input-name' required />
                        <select name='fulltime' id='fulltime' className='select'>
                            <option className='option' value='true'>FullTime Job</option>
                            <option className='option' value='false'>PartTime Job</option>
                        </select>
                        <button type='submit' className='submit'>Search</button>
                    </form>
                    <div className='list'>
                        {
                            this.state.listOfJobs.map((item,index) => <JobList key={index} item={item} />)
                        }
                    </div>
                </div>
            </>
        )
    }
}

export default Job