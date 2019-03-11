import React from 'react';
import {AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

// Pages within our app
import LandingPage from './landing_page';
import NavBarContainer from './nav/navbar_container';
import ProjectionFormContainer from './projection/projection_form_container';
import Modal from './modal/modal';



const App = () => (
    <div>
        <Modal />
        <header>
            <NavBarContainer />
        </header>
        <main>
            <Switch>
                <AuthRoute exact path='/' component={LandingPage}/>
                <Route exact path="/info" component={ProjectionFormContainer}/>
                <ProtectedRoute exact path="/navbar" component={NavBarContainer}/>
            </Switch>
        </main>
        <footer>
        </footer>
    </div>
);

export default App;