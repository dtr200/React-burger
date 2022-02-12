import access from './access';

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
    CANCEL_UPDATE_USER_DATA,
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
} from '../action-constants/access';

import { initialAccessState } from './access';

describe('access reducer', () => {
    it('should return the initial state', () => {
        expect(access(initialAccessState, { type: '' })).toEqual(initialAccessState)
    })
    it('should handle SET_NAME', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                name: 'name'
            }
        }
        expect(access(initialAccessState, { type: SET_NAME, payload: 'name' })).toEqual(state)
    })
    it('should handle SET_EMAIL', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                email: 'email'
            }
        }
        expect(access(initialAccessState, { type: SET_EMAIL, payload: 'email' })).toEqual(state)
    })
    it('should handle SET_LOGIN', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                login: 'login'
            }
        }
        expect(access(initialAccessState, { type: SET_LOGIN, payload: 'login' })).toEqual(state)
    })
    it('should handle SET_PASSWORD', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                password: 'password'
            }
        }
        expect(access(initialAccessState, { type: SET_PASSWORD, payload: 'password' })).toEqual(state)
    })
    it('should handle SET_NEW_PASSWORD', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                newPassword: 'newpassword'
            }
        }
        expect(access(initialAccessState, { type: SET_NEW_PASSWORD, payload: 'newpassword' })).toEqual(state)
    })
    it('should handle SET_RESTORE_EMAIL', () => {
        const state = {
            ...initialAccessState,
            changePasswordEmail: 'email'
        }
        expect(access(initialAccessState, { type: SET_RESTORE_EMAIL, email: 'email' })).toEqual(state)
    })
    it('should handle REGISTER_USER_REQUEST', () => {
        const state = {
            ...initialAccessState,
            registerRequest: true
        }
        expect(access(initialAccessState, { type: REGISTER_USER_REQUEST })).toEqual(state)
    })
    it('should handle REGISTER_USER_SUCCESS', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                name:'',
                email: '',
                password:''
            },        
            registerRequest: false,
            registerFailed: false
        };
        expect(access(initialAccessState, { type: REGISTER_USER_SUCCESS })).toEqual(state)
    })
    it('should handle REGISTER_USER_FAILED', () => {
        const state = {
            ...initialAccessState,                   
            registerRequest: false,
            registerFailed: true
        };
        expect(access(initialAccessState, { type: REGISTER_USER_FAILED })).toEqual(state)
    })
    it('should handle LOGIN_USER_REQUEST', () => {
        const state = {
            ...initialAccessState,                   
            loginRequest: true
        };
        expect(access(initialAccessState, { type: LOGIN_USER_REQUEST })).toEqual(state)
    })
    it('should handle LOGIN_USER_SUCCESS', () => {
        const state = {
            ...initialAccessState,                   
            user: {
                ...initialAccessState.user,
                name: 'name',
                email: 'email',
                password: ''
            },
            loginRequest: false,
            loginFailed: false
        };
        expect(access(initialAccessState, 
            { type: LOGIN_USER_SUCCESS, user: {name: 'name', email: 'email'} })).toEqual(state)
    })
    it('should handle LOGIN_USER_FAILED', () => {
        const state = {
            ...initialAccessState,                   
            loginRequest: false,
            loginFailed: true
        };
        expect(access(initialAccessState, { type: LOGIN_USER_FAILED })).toEqual(state)
    })
    it('should handle UPDATE_USER_DATA_REQUEST', () => {
        const state = {
            ...initialAccessState,                   
            userDataRequest: true
        };
        expect(access(initialAccessState, { type: UPDATE_USER_DATA_REQUEST })).toEqual(state)
    })
    it('should handle UPDATE_USER_DATA_SUCCESS', () => {
        const state = {
            ...initialAccessState,                   
            userDataRequest: false,
            userDataFailed: false,
            user: {
                ...initialAccessState.user,
                name: 'name',
                email: 'email',
                password: ''
            }
        };
        expect(access(initialAccessState, 
            { type: UPDATE_USER_DATA_SUCCESS, user: {name: 'name', email: 'email'} })).toEqual(state)
    })
    it('should handle UPDATE_USER_DATA_FAILED', () => {
        const state = {
            ...initialAccessState,                   
            userDataRequest: false,
            userDataFailed: true
        };
        expect(access(initialAccessState, { type: UPDATE_USER_DATA_FAILED })).toEqual(state)
    })
    it('should handle CANCEL_UPDATE_USER_DATA', () => {
        const state = {
            ...initialAccessState,                   
            user: {
                ...initialAccessState.user,
                login: '',
                password: ''
            }
        };
        expect(access(initialAccessState, { type: CANCEL_UPDATE_USER_DATA })).toEqual(state)
    })
    it('should handle RESTORE_PASSWORD_REQUEST', () => {
        const state = {
            ...initialAccessState,
            changePasswordRequest: true
        };
        expect(access(initialAccessState, { type: RESTORE_PASSWORD_REQUEST })).toEqual(state)
    })
    it('should handle RESTORE_PASSWORD_SUCCESS', () => {
        const state = {
            ...initialAccessState,
            changePasswordRequest: false,
            changePasswordFailed: false,
            changePasswordMessage: 'str',
            changePasswordEmail: ''
        };
        expect(access(initialAccessState, { type: RESTORE_PASSWORD_SUCCESS, message: 'str' })).toEqual(state)
    })
    it('should handle RESTORE_PASSWORD_FAILED', () => {
        const state = {
            ...initialAccessState,
            changePasswordRequest: false,
            changePasswordFailed: true,
            changePasswordMessage: null
        };
        expect(access(initialAccessState, { type: RESTORE_PASSWORD_FAILED })).toEqual(state)
    })
    it('should handle GET_NEW_PASSWORD_REQUEST', () => {
        const state = {
            ...initialAccessState, 
            newPasswordRequest: true,
            user: {
                ...initialAccessState.user,
                newPassword: ''
            }

        };
        expect(access(initialAccessState, { type: GET_NEW_PASSWORD_REQUEST })).toEqual(state)
    })
    it('should handle GET_NEW_PASSWORD_SUCCESS', () => {
        const state = {
            ...initialAccessState, 
            newPasswordRequest: false,
            newPasswordFailed: false
        };
        expect(access(initialAccessState, { type: GET_NEW_PASSWORD_SUCCESS })).toEqual(state)
    })
    it('should handle GET_NEW_PASSWORD_FAILED', () => {
        const state = {
            ...initialAccessState, 
            newPasswordRequest: false,
            newPasswordFailed: true
        };
        expect(access(initialAccessState, { type: GET_NEW_PASSWORD_FAILED })).toEqual(state)
    })
    it('should handle SET_RESTORE_CODE', () => {
        const state = {
            ...initialAccessState, 
            restoreCode: 'code'
        };
        expect(access(initialAccessState, { type: SET_RESTORE_CODE, payload: 'code' })).toEqual(state)
    })
    it('should handle REFRESH_TOKEN_REQUEST', () => {
        const state = {
            ...initialAccessState, 
            refreshTokenRequest: true
        };
        expect(access(initialAccessState, { type: REFRESH_TOKEN_REQUEST })).toEqual(state)
    })
    it('should handle REFRESH_TOKEN_SUCCESS', () => {
        const state = {
            ...initialAccessState, 
            refreshTokenRequest: false,
            refreshTokenFailed: false
        };
        expect(access(initialAccessState, { type: REFRESH_TOKEN_SUCCESS })).toEqual(state)
    })
    it('should handle REFRESH_TOKEN_FAILED', () => {
        const state = {
            ...initialAccessState, 
            refreshTokenRequest: false,
            refreshTokenFailed: true
        };
        expect(access(initialAccessState, { type: REFRESH_TOKEN_FAILED })).toEqual(state)
    })
    it('should handle LOGOUT_USER_REQUEST', () => {
        const state = {
            ...initialAccessState, 
            refreshTokenRequest: false,
            logoutRequest: true
        };
        expect(access(initialAccessState, { type: LOGOUT_USER_REQUEST })).toEqual(state)
    })
    it('should handle LOGOUT_USER_SUCCESS', () => {
        const state = {
            ...initialAccessState, 
            user: {
                ...initialAccessState.user
            },
            logoutRequest: false,
            logoutFailed: false,
            logoutMessage: 'message' 
        };
        expect(access(initialAccessState, { type: LOGOUT_USER_SUCCESS, message: 'message' })).toEqual(state)
    })
    it('should handle LOGOUT_USER_FAILED', () => {
        const state = {
            ...initialAccessState, 
            user: {
                ...initialAccessState.user
            },
            logoutRequest: false,
            logoutFailed: true
        };
        expect(access(initialAccessState, { type: LOGOUT_USER_FAILED })).toEqual(state)
    })
})