import React from 'react';
import {Animated} from "react-animated-css";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            formType: '',
            errors: {}
          };
        this.handleSignup = this.handleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
        this.clearedErrors = false;
    }


    componentDidMount() {
        this.checkFormType();
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname){
            this.checkFormType();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser) {
            this.props.history.push('/projections');
    // FEEDBACK 
    // Unsure about this routing -- combined these forms together and I'm
    // not positive about how this is supposed to work.
    // Don't quite understand why we're pushing to login?
        } 
        else if (nextProps.signedIn === true) {
            this.props.history.push('/projections');
        }
        this.setState({errors: nextProps.errors});
    }

    checkFormType() {
        if (this.props.location.pathname === '/login'){
            this.setState( {formType: "Login"});
        } else if (this.props.location.pathname === '/signup'){
            this.setState( {formType: "Signup"});
        } else {
            this.props.history.push('/login');
        }
    }

    handleUpdate(field) {
        return e => this.setState({
          [field]: e.currentTarget.value
        });
      }

    handleSignup(e) {
        e.preventDefault();
        console.log(this.state.name)
        console.log(this.state.email)
        console.log(this.state.password)
        let user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
        };
            this.props.signup(user, this.props.history);
    }

    handleLogin(e) {
        e.preventDefault();
            let user = {
                email: this.state.email,
                password: this.state.password,
            };
            this.props.login(user);
    }
    
    renderErrors() {
        return (
            <ul>
                {Object.keys(this.state.errors).map( (error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        );
    }
    

    render() {

        return (
          <div className="session-form-container flex">
            <form className="flex" onSubmit={ this.state.formType === "Signup" ? this.handleSignup : this.handleLogin }>
              <Animated animationIn="slideInLeft" animationInDelay="5s" animationOut="rubberBand" isVisible={true}>
              <div className="session-form flex">
                { this.state.formType === "Signup" ? (
                  <input type="text"
                  value={this.state.name}
                  onChange={this.handleUpdate('name')}
                  placeholder="Name"
                  />
                  ) : ( "" )
                }
                  <input type="text"
                    value={this.state.email}
                    onChange={this.handleUpdate('email')}
                    placeholder="  Email"
                  />
                  <input type=" password"
                    value={this.state.password}
                    onChange={this.handleUpdate('password')}
                    placeholder="  Password"
                  />
                  <input type="submit" value="Submit" />
                  <span>{this.renderErrors()}</span>
              </div>
                  </Animated>
            </form>
            <div className="session-img">
                    < img src = "https://media.giphy.com/media/RLxLgDyVSxs9G/giphy.gif" />
            </div>
          </div>
        );
      }




}

export default SessionForm;
