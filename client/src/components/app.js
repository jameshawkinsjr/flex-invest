import React from 'react';
import {AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';

// Pages within our app
import LandingPage from './landing_page';
import NavBarContainer from './nav/navbar_container';
import ProjectionFormContainer from './projection/projection_form_container';
import Modal from './modal/modal';

import Footer from './footer/footer';
import ChartContainer from './chart/chart_container';


const App = () => (
    <div>
        <Modal />
        <header>
            <NavBarContainer />
        </header>
        <main>
            <Switch>
                <Route exact path='/' component={LandingPage}/>
                <Route exact path="/info" component={ProjectionFormContainer}/>
                <Route path="/chart" component={ChartContainer}/>
            </Switch>
        </main>
        <footer>
            <Footer />
        </footer>
    </div>
);

export default App;
