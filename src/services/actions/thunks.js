import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_MODAL_DATA,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED,
    GET_NEW_PASSWORD_REQUEST,
    GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED
} from './action-types';

import {
    BASE_URL
} from '../../utils/constants';

export const getIngredients = (ingredientsURL) => {
    return async (dispatch) => {
        try{
            dispatch({ 
                type: GET_INGREDIENTS_REQUEST 
            });
            const res = await fetch(`${BASE_URL}${ingredientsURL}`);
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
            const res = await fetch(`${BASE_URL}${orderURL}`, {
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

export const restorePassword = (restoreUrl, email) => {
    return async (dispatch) => {
        const emailBody = { email };

        try{
            dispatch({ 
                type: RESTORE_PASSWORD_REQUEST 
            });
            const res = await fetch(restoreUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(emailBody)
            })
            if(!res.ok) throw new Error('');

            const data = await res.json();

            dispatch({
                type: RESTORE_PASSWORD_SUCCESS,
                message: data.message
            });
        }
        catch(err){
            dispatch({
                type: RESTORE_PASSWORD_FAILED
            });
        }
    }
}

export const getNewPassword = (restoreUrl, password, token) => {
    return async (dispatch) => {
        const passwordBody = { password, token };
        try{
            dispatch({
                type: GET_NEW_PASSWORD_REQUEST
            });

            const res = await fetch(restoreUrl, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(passwordBody)
            });

            if(!res.ok) throw new Error('');

            const data = await res.json();

            dispatch({
                type: GET_NEW_PASSWORD_SUCCESS,
                message: data.message
            });
        }
        catch(err){
            dispatch({
                type: GET_NEW_PASSWORD_FAILED
            })
        }
    }
}