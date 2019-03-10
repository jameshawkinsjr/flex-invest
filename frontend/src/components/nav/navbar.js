import React from 'react';
import { Link } from 'react-router-dom';
class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false,
        }
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
        debugger
        if (this.props.loggedIn) {
            return (
                <div className="flex">
                    <Link className="navbar-link" to={'/projections'}>Your Projections</Link>
                    <Link className="navbar-link" to={'/profile'}>Your Profile</Link>
                    <button className="navbar-button" onClick={this.logoutCurrentUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="flex">
                    <Link className="navbar-button" to={'/signup'}>Sign Up</Link>
                    <Link className="navbar-button" to={'/login'}>Login</Link>
                </div>
            )
        }
    }
    debugger

    render() {
        return (
        <div className="navbar-container flex">
            <div className="navbar-logo">
                <Link to={'/'}>
                    <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png" alt="placeholder"></img>
                </Link>
            </div>
            { this.getLinks() }
        </div>
        )
    }
}

export default NavBar;