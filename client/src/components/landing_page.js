import React from 'react';
import Footer from './footer/footer';
import { Link } from 'react-router-dom';
import {Animated} from "react-animated-css";
import { AwesomeButton } from "react-awesome-button";
import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";


class LandingPage extends React.Component {
    render () {
        return (
            <>
            <div className="hero-banner">
            </div>
            <Animated animationIn="slideInDown" isVisible={true}>
            <div className="hero-image">
                <h1>
                    Welcome to 💪Invest
                </h1>
                <p> 🙌 Visiting our site might have been the smartest thing you've ever done. 🙌</p>
                <Link className="call-to-action" to={'/info'}> ➡️ Let's get started ️️️➡️</Link>

            </div>  
            </Animated>  
        </>
        )
    }
}

export default LandingPage;