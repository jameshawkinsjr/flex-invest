import { RECEIVE_CURRENT_PROJECTION } from '../../actions/projection_actions';

const ProjectionReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_PROJECTION:
            return action.currentProjection;
        default:
            return state;
    }
};

export default ProjectionReducer;