import {
    SET_NAME,
    SET_EMAIL,
    SET_LOGIN,
    SET_PASSWORD,
    SET_RESTORE_EMAIL,
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
    SET_NEW_PASSWORD,
    SET_RESTORE_CODE,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_FAILED,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILED
} from '../actions/action-types';

const initialAccessState = {
    name: '',
    email: '',
    login: '',
    password: '',
    isLoggedIn: false,
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    userDataRequest: false,
    userDataFailed: false,
    changePasswordEmail: '',
    changePasswordRequest: false,
    changePasswordFailed: false,
    changePasswordMessage: null,
    newPassword: '',
    newPasswordRequest: false,
    newPasswordFailed: false,
    newPasswordMessage: null,
    restoreCode: '',
    accessToken: '',
    refreshToken: '',
    refreshTokenRequest: false,
    refreshTokenFailed: false,
    logoutRequest: false,
    logoutFailed: false,
    logoutMessage: null
}

export default (state = initialAccessState, action) => {
    switch(action.type){
        case SET_NAME: {
            return {
                ...state,
                name: action.payload
            }
        }
        case SET_EMAIL: {
            return {
                ...state,
                email: action.payload
            }
        }
        case SET_LOGIN: {
            return {
                ...state,
                login: action.payload
            }
        }
        case SET_PASSWORD: {
            return {
                ...state,
                password: action.payload
            }
        }
        case SET_RESTORE_EMAIL: {
            return {
                ...state,                
                changePasswordEmail: action.email
            }
        }
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
                registerRequest: true
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                registerRequest: false,
                registerFailed: false,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
                registerRequest: false,
                registerFailed: true
            }
        }
        case LOGIN_USER_REQUEST: {
            return {
                ...state,
                loginRequest: true
            }
        }
        case LOGIN_USER_SUCCESS: {
            return {
                ...state,
                name: action.user.name,
                email: action.user.email,
                password: '',
                loginRequest: false,
                loginFailed: false,
                isLoggedIn: true,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case LOGIN_USER_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginFailed: true
            }
        }
        case UPDATE_USER_DATA_REQUEST: {
            return {
                ...state,
                userDataRequest: true
            }
        }
        case UPDATE_USER_DATA_SUCCESS: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: false,
                name: action.user.name,
                email: action.user.email,
                password: ''
            }
        }
        case UPDATE_USER_DATA_FAILED: {
            return {
                ...state,
                userDataRequest: false,
                userDataFailed: true
            }
        }
        case RESTORE_PASSWORD_REQUEST: {
            return {
                ...state,                
                changePasswordRequest: true
            }
        }
        case RESTORE_PASSWORD_SUCCESS: {
            return {
                ...state,
                changePasswordRequest: false,
                changePasswordFailed: false,
                changePasswordMessage: action.message,
                changePasswordEmail: ''
            }
        }
        case RESTORE_PASSWORD_FAILED: {
            return {
                ...state,
                changePasswordRequest: false,
                changePasswordFailed: true,
                changePasswordMessage: null
            }
        }
        case SET_NEW_PASSWORD: {
            return {
                ...state,
                newPassword: action.payload
            }
        }
        case SET_RESTORE_CODE: {
            return {
                ...state,
                restoreCode: action.payload
            }
        }       
        case GET_NEW_PASSWORD_REQUEST: {
            return {
                ...state,
                newPasswordRequest: true,
                newPassword: ''
            }
        }
        case GET_NEW_PASSWORD_SUCCESS: {
            return {
                ...state,
                newPasswordRequest: false,
                newPasswordFailed: false,
                newPasswordMessage: action.message              
            }
        }
        case GET_NEW_PASSWORD_FAILED: {
            return {
                ...state,
                newPasswordRequest: false,
                newPasswordFailed: true
            }
        }
        case REFRESH_TOKEN_REQUEST: {
            return {
                ...state,
                refreshTokenRequest: true
            }
        }
        case REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: false,             
                accessToken: action.accessToken,
                refreshToken: action.refreshToken
            }
        }
        case REFRESH_TOKEN_FAILED: {
            return {
                ...state,
                refreshTokenRequest: false,
                refreshTokenFailed: true
            }
        }
        case LOGOUT_USER_REQUEST: {
            return {
                ...state,
                logoutRequest: true
            }
        }
        case LOGOUT_USER_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: false,             
                accessToken: '',
                refreshToken: '',
                logoutMessage: action.message
            }
        }
        case LOGOUT_USER_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutFailed: true
            }
        }
        default: return state;
    }
}