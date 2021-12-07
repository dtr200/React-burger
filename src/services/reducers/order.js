import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED
} from '../actions/action-types';

const initialOrderState = {
    orderRequest: false,
    orderData: {},
    orderFailed: false,
};

export default (state = initialOrderState, action) => {
    switch(action.type){
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderData: action.data,
                orderFailed: false,
            }
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true
            }
        }
        default:
            return state;
    }
}