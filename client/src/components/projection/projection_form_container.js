import { connect } from 'react-redux';
import { saveProjection } from '../../actions/projection_actions';
import { withRouter } from 'react-router-dom';

import ProjectionForm from './projection_form';

const mapStateToProps = (state, ownProps) => ({
  // user: state.session.user.id,
  name: "",
  yearToRetire: 0, 
  income: 0,
  savingRate: 0,
  employerMatch: 0,
  currentSavings: 0
})


const mapDispatchToProps = dispatch => ({
  createProjection: (info) => dispatch(saveProjection(info))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectionForm));