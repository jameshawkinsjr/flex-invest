import { connect } from 'react-redux';
import Fund from './fund';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Fund));