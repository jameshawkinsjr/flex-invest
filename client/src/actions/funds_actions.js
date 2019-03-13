import * as APIUtil from '../util/funds_api_util';

export const RECEIVE_ALL_FUNDS = "RECEIVE_ALL_FUNDS";

export const receiveAllFunds = funds => ({
    type: RECEIVE_ALL_FUNDS,
    funds
});

// THUNK ACTIONS
export const fetchFunds = () => dispatch => (
    APIUtil.fetchFunds()
        .then(
            funds => dispatch(receiveAllFunds(funds))
        )
);