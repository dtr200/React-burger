import {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_EMAIL_PASSWORD_RESTORE,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED,    
    GET_NEW_PASSWORD_REQUEST,
    GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED,
    SET_NEW_PASSWORD,
    SET_TOKEN
} from '../actions/action-types';

const initialAccessState = {
    name: null,
    email: null,
    password: null,
    changePasswordEmail: '',
    changePasswordRequest: false,
    changePasswordFailed: false,
    changePasswordMessage: null,
    newPassword: '',
    newPasswordRequest: false,
    newPasswordFailed: false,
    newPasswordMessage: '',
    token: ''
}

export default (state = initialAccessState, action) => {
    switch(action.type){
        case SET_NAME: {
            return {
                ...state,
                name: action.name
            }
        }
        case SET_EMAIL: {
            return {
                ...state,
                email: action.email
            }
        }
        case SET_PASSWORD: {
            return {
                ...state,
                password: action.password
            }
        }
        case SET_EMAIL_PASSWORD_RESTORE: {
            return {
                ...state,                
                changePasswordEmail: action.email
            }
        }
        case RESTORE_PASSWORD_REQUEST: {
            return {
                ...state,
                name: null,
                email: null,
                password: null,
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
            }
        }        
        case SET_TOKEN: {
            return {
                ...state,
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