import React from 'react';
import { Link } from 'react-router-dom';
import {Animated} from "react-animated-css";


class LandingPage extends React.Component {

    render () {
        return (
            <>
            <div className="hero-banner ">
            </div>
            <Animated animationIn="slideInDown" isVisible={true}>
            <div className="hero-image flex-column">
                <div className="hero-introduction">
                <h1>
                    Welcome to <span role="img" aria-label="flexing-emoji">️💪</span>Invest
                </h1>
                    <h2>
                    Here at <span role="img" aria-label="flexing-emoji">️💪</span>Invest, we give you the tools to see how powerful compound interest, 401k employer matching, and regular contributions can be for retirement. If you take a minute to fill out your information, you can see for yourself!
                    </h2>
                <p> <span role="img" aria-label="hands-in-air-emoji">️🙌</span> Visiting our site might have been the smartest thing you've ever done. <span role="img" aria-label="hands-in-air-emoji">️🙌</span></p>
                <Link className="call-to-action" to={'/info'}> <span role="img" aria-label="forward-arrow-emoji">️➡️</span> Let's get started ️️️<span role="img" aria-label="forward-arrow-emoji">️➡️</span></Link>
                </div>

            </div>  
            </Animated>  
        </>
        )
    }
}

export default LandingPage;