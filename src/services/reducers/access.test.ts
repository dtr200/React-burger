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
        expect(access(undefined, { type: '' })).toEqual(initialAccessState)
    })
    it('should handle SET_NAME', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                name: 'name'
            }
        }
        expect(access(undefined, { type: SET_NAME, payload: 'name' })).toEqual(state)
    })
    it('should handle SET_EMAIL', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                email: 'email'
            }
        }
        expect(access(undefined, { type: SET_EMAIL, payload: 'email' })).toEqual(state)
    })
    it('should handle SET_LOGIN', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                login: 'login'
            }
        }
        expect(access(undefined, { type: SET_LOGIN, payload: 'login' })).toEqual(state)
    })
    it('should handle SET_PASSWORD', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                password: 'password'
            }
        }
        expect(access(undefined, { type: SET_PASSWORD, payload: 'password' })).toEqual(state)
    })
    it('should handle SET_NEW_PASSWORD', () => {
        const state = {
            ...initialAccessState,
            user: {
                ...initialAccessState.user,
                newPassword: 'newpassword'
            }
        }
        expect(access(undefined, { type: SET_NEW_PASSWORD, payload: 'newpassword' })).toEqual(state)
    })
    it('should handle SET_RESTORE_EMAIL', () => {
        const state = {
            ...initialAccessState,
            changePasswordEmail: 'email'
        }
        expect(access(undefined, { type: SET_RESTORE_EMAIL, email: 'email' })).toEqual(state)
    })
    it('should handle REGISTER_USER_REQUEST', () => {
        const state = {
            ...initialAccessState,
            registerRequest: true
        }
        expect(access(undefined, { type: REGISTER_USER_REQUEST })).toEqual(state)
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
        expect(access(undefined, { type: REGISTER_USER_SUCCESS })).toEqual(state)
    })
    it('should handle REGISTER_USER_FAILED', () => {
        const state = {
            ...initialAccessState,                   
            registerRequest: false,
            registerFailed: true
        };
        expect(access(undefined, { type: REGISTER_USER_FAILED })).toEqual(state)
    })
})