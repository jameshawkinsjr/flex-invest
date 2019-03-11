import * as APIUtil from '../util/projections_api_util';

export const RECEIVE_CURRENT_PROJECTION = "RECEIVE_CURRENT_PROJECTION";
export const RECEIVE_PROJECTION_ERRORS = "RECEIVE_PROJECTION_ERRORS";

export const receiveCurrentProjection = currentProjection => ({
    type: RECEIVE_CURRENT_PROJECTION,
    currentProjection
});

export const receiveProjectionErrors = errors => ({
    type: RECEIVE_PROJECTION_ERRORS,
    errors
});

// THUNK ACTIONS
export const fetchProjection = userId => dispatch => (
    APIUtil.fetchProjection(userId)
        .then(
            currentProjection => dispatch(receiveCurrentProjection(currentProjection)),
            err => dispatch(receiveProjectionErrors(err.response.data))
        )
);

export const saveProjection = projection => dispatch => (
    APIUtil.saveProjection(projection)
        .then(
            currentProjection => dispatch(receiveCurrentProjection(currentProjection)),
            err => dispatch(receiveProjectionErrors(err.response.data))
        )
);
