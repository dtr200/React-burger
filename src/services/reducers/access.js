import {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_EMAIL_PASSWORD_RESTORE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED,    
    GET_NEW_PASSWORD_REQUEST,
    GET_NEW_PASSWORD_SUCCESS,
    GET_NEW_PASSWORD_FAILED,
    SET_NEW_PASSWORD,
    SET_ACCESS_TOKEN,
    SET_RESTORE_CODE
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
    restoreCode: '',
    accessToken: ''
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
        case SET_EMAIL_PASSWORD_RESTORE: {
            return {
                ...state,                
                changePasswordEmail: action.email
            }
        }
        case REGISTER_USER_REQUEST: {
            return {
                ...state,
            }
        }
        case REGISTER_USER_SUCCESS: {
            return {
                ...state,
            }
        }
        case REGISTER_USER_FAILED: {
            return {
                ...state,
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
        case SET_ACCESS_TOKEN: {
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