import { connect } from 'react-redux';
import { receiveCurrentProjection } from '../../actions/projections_actions';

import ProjectionForm from './projection_form';

const mapStateToProps = (state) => ({
  name: "",
  yearToRetire: 0, 
  income: 0,
  savingRate: 0,
  employerMatch: 0,
  currentSavings: 0
})


const mapDispatchToProps = dispatch => ({
  createProjection: (info) => dispatch(receiveCurrentProjection(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionForm);