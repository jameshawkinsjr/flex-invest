import { connect } from 'react-redux';
import { receiveCurrentProjection } from '../../actions/projection_actions';

import ProjectionForm from './projection_form';

const mapStateToProps = (state) => ({
  name: "",
  yearToRetire: "", 
  income: 0,
  savingRate: 0,
  employerMatch: 0, 
  date: 0
})


const mapDispatchToProps = dispatch => ({
  createProjection: (info) => dispatch(receiveCurrentProjection(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectionForm);