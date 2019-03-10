import { connect } from 'react-redux';
import { login, signup } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => ({
    signedIn: state.session.isAuthenticated,
    errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    login: user => dispatch(login(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);