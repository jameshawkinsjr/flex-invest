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
                        <Link className="navbar-dropdown-link" to={'/chart'}>Your Projection <span role="img" aria-label="chart-emoji">📊</span> </Link>
                        {/*</div><div className="navbar-dropdown">
                            <button className="navbar-dropdown-button">Your account</button>
                            <div className="navbar-dropdown-content">
                                <Link className="navbar-dropdown-link" to={'/profile'}>Your Profile</Link> */}
                                <button className="navbar-dropdown-link" onClick={this.logoutCurrentUser}>Logout <span role="img" aria-label="x-button-emoji">❌</span></button>
                            {/* </div> */}
                        {/* </div> */}
                </div>
            );
        } else {
            return (
                <div className="flex modal-buttons">
                    <button onClick={() => this.props.openModal('login')}>Login <span role="img" aria-label="checkmark-emoji">✅</span></button>
                    <button onClick={() => this.props.openModal('signup')}>Signup <span role="img" aria-label="up-arrow-emoji">⬆️</span>️</button>
                </div>
            )
        }
    }

    render() {
        return (
        <div className="navbar-container flex">
            <div className="navbar-logo">
                <Link to={'/'}>
                    <div className="logo"> <span role="img" aria-label="flexing-emoji">💪</span> Invest <span role="img" aria-label="chart-emoji">📈</span> </div>
                </Link>
            </div>
            { this.getLinks() }
        </div>
        )
    }
}

export default NavBar;