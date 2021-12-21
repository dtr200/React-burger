import {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_RESTORE_EMAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED,    
    GET_NEW_PASSWORD_REQUEST,
    GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED,
    SET_NEW_PASSWORD,
    SET_RESTORE_CODE
} from '../actions/action-types';

const initialAccessState = {
    name: '',
    email: '',
    password: '',
    isLogged: false,
    registerRequest: false,
    registerFailed: false,
    loginRequest: false,
    loginFailed: false,
    changePasswordEmail: '',
    changePasswordRequest: false,
    changePasswordFailed: false,
    changePasswordMessage: null,
    newPassword: '',
    newPasswordRequest: false,
    newPasswordFailed: false,
    newPasswordMessage: '',
    restoreCode: '',
    accessToken: '',
    refreshToken: ''
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
                email: '',
                password: '',
                loginRequest: false,
                loginFailed: false,
                isLogged: true,
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
        default: return state;
    }
}