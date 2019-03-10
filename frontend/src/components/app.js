import React from 'react';
import {AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch } from 'react-router-dom';

// Pages within our app
import LandingPage from './landing_page';
import NavBarContainer from './nav/navbar_container';
import SessionFormContainer from './session/session_form_container';


const App = () => (
    <div>
        <header>
            <NavBarContainer />
        </header>
        <main>
            <Switch>
                <AuthRoute exact path='/' component={LandingPage}/>
                <AuthRoute exact path="/login" component={SessionFormContainer}/>
                <AuthRoute exact path="/signup" component={SessionFormContainer}/>
                {/* <ProtectedRoute exact path="/profile" component={ProfileContainer}/> */}
            </Switch>
        </main>
        <footer>
        </footer>
    </div>
);

export default App;