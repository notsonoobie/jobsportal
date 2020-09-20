import React, { Component } from 'react'

class JobList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        const { company,
                company_logo,
                company_url,
                location,
                title,
                how_to_apply
            } = this.props.item
        console.log(this.props.item)
        return (
            <div>
                <p>{company}</p>
                <p>{company_logo}</p>
                <p>{company_url}</p>
                <p>{location}</p>
                <p>{title}</p>
                <p>{how_to_apply}</p>
            </div>
        )
    }
}
export default JobList