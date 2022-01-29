import {
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
} from '../action-constants/access';

import { BASE_URL } from '../../utils/constants';
import {
    fetchWithRefresh, checkResponse, setCookie, deleteCookie
} from '../../utils/utils';
import { AppThunk, AppDispatch } from '../types';

export const restorePassword: AppThunk = (restoreUrl, email) => {
    return async (dispatch: AppDispatch) => {
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

            const data = await checkResponse(res);
            
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

export const getNewPassword: AppThunk = (restoreUrl, password, token) => {
    return async (dispatch: AppDispatch) => {
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

            const data = await checkResponse(res);

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

export const registerNewUser: AppThunk = (userData) => {
    return async (dispatch: AppDispatch) => {
        try{
            dispatch({
                type: REGISTER_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })

            const data = await checkResponse(res);

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

export const loginUser: AppThunk = (userData) => {
    return async (dispatch: AppDispatch) => {
        try{
            dispatch({
                type: LOGIN_USER_REQUEST
            });

            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData)
            })

            const data = await checkResponse(res);

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

export const updateToken: AppThunk = () => {
    return async (dispatch: AppDispatch) => {
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

export const logoutUser: AppThunk = () => {
    return async (dispatch: AppDispatch) => {
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

            const data = await checkResponse(res);

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

export const getUserData: AppThunk = (methodType, userData) => {
    return async (dispatch: AppDispatch) => {        
        const accessToken: string = 
            document.cookie.match(/(accessToken=)(.+)/)![2];

        try{
            dispatch({
                type: UPDATE_USER_DATA_REQUEST
            });

            const data = await fetchWithRefresh(`${BASE_URL}/auth/user`, {
                method: methodType,
                headers: { 
                    'authorization': accessToken,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(userData)
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