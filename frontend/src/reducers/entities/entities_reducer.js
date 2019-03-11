import { combineReducers } from 'redux';
import ProjectionsReducer from './projections_entities_reducer';

export default combineReducers({
    projection: ProjectionsReducer,
});