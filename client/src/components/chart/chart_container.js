import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchFunds } from '../../actions/funds_actions';
import { withRouter } from 'react-router-dom';

import Chart from './chart';

const mapStateToProps = (state, ownProps) => ({
    projection: state.entities.projection.data
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchFunds: () => dispatch(fetchFunds()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chart));