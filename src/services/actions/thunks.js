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

const setCookie = (name, value, time) => {
    const data = time ? 
        `${name}=${value}; max-age=${time}` : 
        `${name}=${value}`;
    document.cookie = data;
}

const deleteCookie = (name) =>
    document.cookie = `${name}=;Expires=${new Date(0).toUTCString()}`;

export const registerNewUser = (registerUrl, userData) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: REGISTER_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}${registerUrl}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })

            if(!res.ok) throw new Error('');

            const data = await res.json();

            setCookie('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken, 1200);
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

export const loginUser = (loginUrl, userData) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: LOGIN_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}${loginUrl}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })

            if(!res.ok) throw new Error('');

            const data = await res.json();
            console.log(data)
            setCookie('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken, 30);
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

export const updateToken = (refreshTokenUrl, refreshToken) => {
    return async (dispatch) => {
        try{
            dispatch({
                type: REFRESH_TOKEN_REQUEST
            });

            const res = await fetch(`${BASE_URL}${refreshTokenUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: refreshToken })
            });

            if(!res.ok) throw new Error('');

            const data = await res.json();

            setCookie('refreshToken', data.refreshToken);
            setCookie('accessToken', data.accessToken, 1200);
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

export const logoutUser = (logoutUrl, refreshToken) => {
    return async (dispatch) => {
        const tokenBody = { token: refreshToken };

        try{
            dispatch({
                type: LOGOUT_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}${logoutUrl}`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(tokenBody)
            })
            
            if(!res.ok) throw new Error('');

            const data = await res.json();
            // deleteCookie('refreshToken');
            deleteCookie('accessToken');
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

export const getUserData = (userDataUrl, accessToken, method = 'GET') => {
    return async (dispatch) => {
        try{
            dispatch({
                type: UPDATE_USER_DATA_REQUEST
            });

            const res = await fetch(`${BASE_URL}${userDataUrl}`, {
                method,
                headers: { 'authorization': accessToken }
            }); 

            if(!res.ok) throw new Error('');

            const data = await res.json();

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

export const updateUserData = (userDataUrl, accessToken) => {
    return async (dispatch) => {
        if(!document.cookie.split('accessToken=')[1])
            await dispatch(updateToken('/auth/token'));
        dispatch(getUserData(userDataUrl, accessToken, 'PATCH'));
    }
}

export const restoreUserData = (userDataUrl, accessToken) => {
    return async (dispatch) => {
        if(!document.cookie.split('accessToken=')[1])
            await dispatch(updateToken('/auth/token'));
        dispatch(getUserData(userDataUrl, accessToken, 'GET'));
    }    
}