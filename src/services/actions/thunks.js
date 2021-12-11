import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_MODAL_DATA,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED
} from './action-types';

export const getIngredients = (ingredientsURL) => {
    return async (dispatch) => {
        try{
            dispatch({ 
                type: GET_INGREDIENTS_REQUEST 
            });
            const res = await fetch(ingredientsURL);
            const json = await res.json();
            dispatch({ 
                type: GET_INGREDIENTS_SUCCESS, 
                ingredients: json.data
            });
        }
        catch(err){
            dispatch({ 
                type: GET_INGREDIENTS_FAILED
            }); 
        }
    }    
}

export const sendOrder = (orderURL, constructorIngredients) => {
    return async (dispatch) => {       
        
        const orderBody = {
            ingredients: constructorIngredients.map(product => product._id)
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