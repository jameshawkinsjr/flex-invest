import React from 'react';
import Footer from './footer/footer';
import { Link } from 'react-router-dom';

class LandingPage extends React.Component {
    render () {
        return (
            <>
            <div className="hero-banner">
            </div>
            <div className="hero-image">
                <h1>
                    Welcome to 💪Invest
                </h1>
                <p> Visting our site might have been the smartest thing you've ever done.</p>
                <Link className="call-to-action" to={'/chart'}>Let's get started </Link>
            </div>    
        </>
        )
    }
}

export default LandingPage;