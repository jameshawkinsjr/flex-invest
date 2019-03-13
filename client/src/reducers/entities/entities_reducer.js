import { combineReducers } from 'redux';
import ProjectionReducer from './projection_entities_reducer';
import FundsReducer from './funds_entities_reducer';

export default combineReducers({
    projection: ProjectionReducer,
    funds: FundsReducer,
});