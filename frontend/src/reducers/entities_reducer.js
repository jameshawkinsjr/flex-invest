import { combineReducers } from 'redux';
import ProjectionsReducer from './projections_reducer';

export default combineReducers({
    projection: ProjectionsReducer,
});