import {
    SET_MODAL_DATA,
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

export const sendOrder = (orderURL, constructorIngredients) => {
    return async (dispatch) => {       
        
        const orderBody = {
            ingredients: constructorIngredients.map(product => product.item._id)
        };
        
        try{
            dispatch({
                type: SEND_ORDER_REQUEST
            })
            const res = await fetch(orderURL, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(orderBody)
            });
    
            if(!res.ok)
                throw new Error('');

            const data = await res.json();

            dispatch({ 
                type: SEND_ORDER_SUCCESS,
                data
            });
            dispatch({ 
                type: SET_MODAL_DATA,
                mode: 'order',
                title: '',
                data
            });
        }
        catch(err){
            dispatch({
                type: SEND_ORDER_FAILED
            });
        }
    }
}