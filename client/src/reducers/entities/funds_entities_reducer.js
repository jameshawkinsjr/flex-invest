import { RECEIVE_ALL_FUNDS } from '../../actions/funds_actions';

const FundsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_ALL_FUNDS:
            return action.funds.data;
        default:
            return state;
    }
};

export default FundsReducer;