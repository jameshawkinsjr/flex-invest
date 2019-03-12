import { combineReducers } from 'redux';
import SessionErrorsReducer from './session_errors_reducer';
import ProjectionErrorsReducer from './projection_errors_reducer';

export default combineReducers({
    session: SessionErrorsReducer,
    projection: ProjectionErrorsReducer,
});