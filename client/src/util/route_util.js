import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';



// FEEDBACK
// Where do we want to reroute someone to if they're logged in?
// For now, I'm going to call this /projection

const Auth = ({ component: Component, path, loggedIn, exact }) => (
    <Route 
        path={path} 
        exact={exact} 
        render={props => (
            !loggedIn? (
                <Component {...props} />
            ) : (
                <Redirect to="/projection" />
                )
        )} 
    />
);

const Protected = ({ component: Component, path, loggedIn, ...rest }) => (
    <Route 
        {...rest}
        render={props => (
            loggedIn? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
                )
        )} 
    />
);

const mapStateToProps = state => ({
    loggedIn: state.session.isAuthenticated
})

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));
export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));