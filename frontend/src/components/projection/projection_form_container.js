import { connect } from 'react-redux';
import { saveProjection } from '../../actions/projections_actions';

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
  createProjection: (currentProjection) => dispatch(saveProjection(currentProjection))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionForm);