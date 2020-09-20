import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../css/NavBar.css'

class NavBar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            open : false
        }
        this.handleProfile = this.handleProfile.bind(this)
    }
    
    handleProfile(){
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
        <>
            <nav className='Navbar'>
                <div className='Navbar-logo'>
                    <h3>JOBS PORTAL</h3>
                </div>
                <div className='Navbar-items'>
                    <ul className='Navbar-ul'>
                        <li className='Navbar-li' onClick={this.props.handleLogout}>Logout</li>
                        <li className='Navbar-li' onClick={this.handleProfile}>Profile</li>
                        <li className='Navbar-li li-link'><Link to='/about'>About</Link></li>
                    </ul>
                </div>
                {
                    this.state.open && (
                        <div onClick={this.handleProfile} className='profile'>
                            <div className='profile-details'>
                                <p className='details'>{this.props.name}</p>
                                <p className='details'>{this.props.email}</p>
                            </div>
                        </div>
                    )
                }
            </nav>
        </>
        )
    }
}

export default NavBar