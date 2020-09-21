import React from 'react'
import '../../css/Home.css'
import github from './png/github.png'
import fb from './png/fb.png'
import email from './png/email.png'
import linkedin from './png/linkedin.png'
import phone from './png/phone.png'
import website from './png/website.png'

const About = () => {
    return (
        <div className='Home'>
            <div className='Home-card'>
                <div className='About-details'>
                    <h2>Rahul Gupta</h2>
                    <h4>Full Stack Web Developer</h4>
                </div>
                <div className='About-links'>
                    <a href='https://github.com/notsonoobie' rel="noopener noreferrer" target="_blank"><img src={github} alt='Github' /></a>
                    <a href='https://fb.com/rahulgupta111998' rel="noopener noreferrer" target="_blank"><img src={fb} alt='Facebook' /></a>
                    <a href='mailto:swastikmedical74@gmail.com'><img src={email} alt='EMail' /></a>
                    <a href='tel:+91-89288-85199'><img src={phone} alt='Contact' /></a>
                    <a href='https://linkedin.com/in/rahul-gupta-6a5967188' rel="noopener noreferrer" target="_blank"><img src={linkedin} alt='Linkedin' /></a>
                    <a href='http://showcasingmyself.netlify.app' rel="noopener noreferrer" target="_blank"><img src={website} alt='Portfolio' /></a>
                </div>
            </div>
        </div>
    )
}
export default About