import { RECEIVE_CURRENT_PROJECTION } from '../../actions/projections_actions';

const ProjectionsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_CURRENT_PROJECTION:
            return action.currentProjection;
        default:
            return state;
    }
};

export default ProjectionsReducer;