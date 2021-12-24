import {    
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    SET_MODAL_DATA,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILED,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED,
    GET_NEW_PASSWORD_REQUEST,
    GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILED
} from './action-types';

import {
    BASE_URL, fetchWithRefresh, setCookie, deleteCookie
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
            const res = await fetch(`${BASE_URL}${restoreUrl}`, {
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

            const res = await fetch(`${BASE_URL}${restoreUrl}`, {
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

export const registerNewUser = (userData) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: REGISTER_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })

            if(!res.ok) throw new Error('');

            const data = await res.json();

            localStorage.setItem('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken);
            dispatch({
                type: REGISTER_USER_SUCCESS
            });
        }
        catch(err){
            dispatch({
                type: REGISTER_USER_FAILED
            })
        }
    }
}

export const loginUser = (userData) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: LOGIN_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })

            if(!res.ok) throw new Error('');

            const data = await res.json();

            localStorage.setItem('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken);
            dispatch({
                type: LOGIN_USER_SUCCESS,
                user: data.user
            })

        }
        catch(err){
            dispatch({
                type: LOGIN_USER_FAILED
            })
        }
    }
}

export const updateToken = () => {
    return async (dispatch) => {
        try{
            dispatch({
                type: REFRESH_TOKEN_REQUEST
            });

            const data = await fetchWithRefresh(`${BASE_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    token: localStorage['refreshToken'] 
                })
            });

            localStorage.setItem('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken);
            dispatch({
                type: REFRESH_TOKEN_SUCCESS
            })

        }
        catch(err){
            dispatch({
                type: REFRESH_TOKEN_FAILED
            })
        }
    }
}

export const logoutUser = () => {
    return async (dispatch) => {
        const tokenBody = { token: localStorage['refreshToken'] };

        try{
            dispatch({
                type: LOGOUT_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(tokenBody)
            })
            
            if(!res.ok) throw new Error('');

            const data = await res.json();

            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch({
                type: LOGOUT_USER_SUCCESS,
                message: data.message
            });
        }
        catch(err){
            dispatch({
                type: LOGOUT_USER_FAILED
            })
        }
    }
}

export const getUserData = (method = 'GET') => {
    return async (dispatch) => {        
        const accessToken = 
            document.cookie.match(/(accessToken=)(.+)/)[2];

        try{
            dispatch({
                type: UPDATE_USER_DATA_REQUEST
            });

            const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
                method,
                headers: { 'authorization': accessToken }
            });

            if(!data.success) throw new Error('');

            dispatch({
                type: UPDATE_USER_DATA_SUCCESS,
                user: data.user
            });
        }
        catch(err){            
            dispatch({
                type: UPDATE_USER_DATA_FAILED
            })
        }
    }
}