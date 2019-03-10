import React from 'react';
import { Link } from 'react-router-dom';

// import './navbar.css';

class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
        this.getLinks = this.getLinks.bind(this);
    }

    logoutCurrentUser(e) {
        e.preventDefault();
        this.props.logout();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.getLinks();
        }
    }

    getLinks() {
        if (this.props.loggedIn) {
            return (
                <div className="navbar-links flex">
                    <Link to={'/projections'}>Your Projections</Link>
                    <Link to={'/profile'}>Your Profile</Link>
                    <button onClick={this.logoutCurrentUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="navbar-links flex">
                    <Link to={'/signup'}>Sign Up</Link>
                    <Link to={'/login'}>Login</Link>
                </div>
            )
        }
    }

    render() {
        return (
        <div className="navbar-container">
            <div className="navbar-logo">
                <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" width="200"></img>
            </div>
            { this.getLinks() }
        </div>
        )
    }
}

export default NavBar;