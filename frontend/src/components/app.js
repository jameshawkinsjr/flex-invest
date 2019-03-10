import React from 'react';
import {AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

// Pages within our app
import LandingPage from './landing_page';
import NavBarContainer from './nav/navbar_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';


const App = () => (
    <Switch>
        <AuthRoute exact path='/' component={LandingPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
    </Switch>
);

export default App;