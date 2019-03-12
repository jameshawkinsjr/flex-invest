import { RECEIVE_CURRENT_PROJECTION, RECEIVE_PROJECTION_ERRORS } from '../../actions/projection_actions';

const _nullErrors = [];

const ProjectionErrorsReducer = (state = _nullErrors, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_PROJECTION_ERRORS:
            return action.errors;
        case RECEIVE_CURRENT_PROJECTION:
            return _nullErrors;
        default:
            return state;
    }
};

export default ProjectionErrorsReducer;