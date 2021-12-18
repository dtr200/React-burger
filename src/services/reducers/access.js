import {
    SET_NAME,
    SET_EMAIL,
    SET_PASSWORD,
    SET_EMAIL_PASSWORD_RESTORE,
    RESTORE_PASSWORD_REQUEST,
    RESTORE_PASSWORD_SUCCESS,
    RESTORE_PASSWORD_FAILED
} from '../actions/action-types';

const initialAccessState = {
    name: null,
    email: null,
    password: null,
    changePasswordEmail: '',
    changePasswordRequest: false,
    changePasswordFailed: false,
    changePasswordMessage: null
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
        default: return state;
    }
}