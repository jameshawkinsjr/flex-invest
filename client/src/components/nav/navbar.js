import React from 'react';
import { Link } from 'react-router-dom';
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
                <div className="modal-buttons flex">
                        <Link className="navbar-dropdown-link" to={'/chart'}>Your Projection 📊</Link>
                        {/*</div><div className="navbar-dropdown">
                            <button className="navbar-dropdown-button">Your account</button>
                            <div className="navbar-dropdown-content">
                                <Link className="navbar-dropdown-link" to={'/profile'}>Your Profile</Link> */}
                                <button className="navbar-dropdown-link" onClick={this.logoutCurrentUser}>Logout ❌</button>
                            {/* </div> */}
                        {/* </div> */}
                </div>
            );
        } else {
            return (
                <div className="flex modal-buttons">
                    <button onClick={() => this.props.openModal('login')}>Login ✅</button>
                    <button onClick={() => this.props.openModal('signup')}>Signup ⬆️</button>
                </div>
            )
        }
    }

    render() {
        return (
        <div className="navbar-container flex">
            <div className="navbar-logo">
                <Link to={'/'}>
                    <div className="logo"> 💪 Invest 📈 </div>
                </Link>
            </div>
            { this.getLinks() }
        </div>
        )
    }
}

export default NavBar;