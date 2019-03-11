import React from 'react';
import { Route } from 'react-router-dom';
import {AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

// Pages within our app
import LandingPage from './landing_page';
import NavBarContainer from './nav/navbar_container';
import SessionFormContainer from './session/session_form_container';
import ProjectionFormContainer from './projection/projection_form_container';
import ProjectionsContainer from './projections/projections_container';


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
                <Route exact path="/info" component={ProjectionFormContainer}/>
                <Route path="/projections" component={ProjectionsContainer}/>
                {/* <ProtectedRoute exact path="/profile" component={ProfileContainer}/> */}
                {/* <Route exact path="/info" component={ProjectionContainer}/> */}
                <ProtectedRoute exact path="/navbar" component={NavBarContainer}/>
            </Switch>
        </main>
        <footer>
        </footer>
    </div>
);

export default App;