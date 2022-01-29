import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    RESET_ORDER_REQUEST
} from '../action-constants/order';

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
                orderData: {},
                orderRequest: false,
                orderFailed: true
            }
        }
        case RESET_ORDER_REQUEST: {
            return {
                initialOrderState
            }
        }
        default:
            return state;
    }
}