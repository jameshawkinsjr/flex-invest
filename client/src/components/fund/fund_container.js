import { connect } from 'react-redux';
import Fund from './fund';
import { fetchFunds } from '../../actions/funds_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
    funds: Object.values(state.entities.funds)
});

const mapDispatchToProps = dispatch => ({
    fetchFunds: () => dispatch(fetchFunds()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Fund));