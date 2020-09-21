import React, { Component } from 'react'
import parse from 'html-react-parser'
import '../../css/JobList.css'
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
          <div className="JobList">
            <section className="JobList-Img">
                <img className='company_img' src={parse(company_logo)} alt={company} />
            </section>
            <section className='JobList-Desc'>
                <h3 className='company_name'>{company}</h3>
                <h4 className='company_title'>{title}</h4>
                <a className='company_url' href={parse(company_url)}>{parse(company_url)}</a>
                <p className='company_location'>{location}</p>
                <p className='company_desc'>{parse(how_to_apply)}</p>
            </section>
          </div>
        );
    }
}
export default JobList