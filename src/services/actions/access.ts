import { 
    TRegisterUserData,
    TUserName,
    TUserEmail,
    TUserLogin,
    TUserPassword,
    TUserNewPassword,
    TUpdateUserData
} from '../../utils/types';
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

export interface ISetNameAction {
    readonly type: typeof SET_NAME;
    readonly payload: string
}
export interface ISetEmailAction {
    readonly type: typeof SET_EMAIL;
    readonly payload: string;
}
export interface ISetLoginAction {
    readonly type: typeof SET_LOGIN;
    readonly payload: string;
}
export interface ISetPasswordAction {
    readonly type: typeof SET_PASSWORD;
    readonly payload: string;
}
export interface ISetRestoreEmailAction {
    readonly type: typeof SET_RESTORE_EMAIL;
    readonly email: string;
}
export interface IRegisterUserRequestAction {
    readonly type: typeof REGISTER_USER_REQUEST;
}
export interface IRegisterUserSuccessAction {
    readonly type: typeof REGISTER_USER_SUCCESS;
    readonly user: TRegisterUserData;
}
export interface IRegisterUserFailedAction {
    readonly type: typeof REGISTER_USER_FAILED;
}
export interface ILoginUserRequestAction {
    readonly type: typeof LOGIN_USER_REQUEST;
}
export interface ILoginUserSuccessAction {
    readonly type: typeof LOGIN_USER_SUCCESS;
    readonly user: TRegisterUserData;
}
export interface ILoginUserFailedAction {
    readonly type: typeof LOGIN_USER_FAILED;
}
export interface IUpdateUserDataRequestAction {
    readonly type: typeof UPDATE_USER_DATA_REQUEST;
}
export interface IUpdateUserDataSuccessAction {
    readonly type: typeof UPDATE_USER_DATA_SUCCESS;
    readonly user: TRegisterUserData;
}
export interface IUpdateUserDataFailedAction {
    readonly type: typeof UPDATE_USER_DATA_FAILED;
}
export interface ICancelUpdateUserDataAction {
    readonly type: typeof CANCEL_UPDATE_USER_DATA;
    readonly user: TUpdateUserData;
}
export interface IRestorePasswordRequestAction {
    readonly type: typeof RESTORE_PASSWORD_REQUEST;
}
export interface IRestorePasswordSuccessAction {
    readonly type: typeof RESTORE_PASSWORD_SUCCESS;
    readonly message: string;
}
export interface IRestorePasswordFailedAction {
    readonly type: typeof RESTORE_PASSWORD_FAILED;
}
export interface IGetNewPasswordRequestAction {
    readonly type: typeof GET_NEW_PASSWORD_REQUEST;
}
export interface IGetNewPasswordSuccessAction {
    readonly type: typeof GET_NEW_PASSWORD_SUCCESS;
}
export interface IGetNewPasswordFailedAction {
    readonly type: typeof GET_NEW_PASSWORD_FAILED;
}
export interface ISetNewPasswordAction {
    readonly type: typeof SET_NEW_PASSWORD;
    readonly payload: string;
}
export interface ISetRestoreCodeAction {
    readonly type: typeof SET_RESTORE_CODE;
    readonly payload: string;
}
export interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenSuccessAction {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
}
export interface IRefreshTokenFailedAction {
    readonly type: typeof REFRESH_TOKEN_FAILED;
}
export interface ILogoutUserRequestAction {
    readonly type: typeof LOGOUT_USER_REQUEST;
}
export interface ILogoutUserSuccessAction {
    readonly type: typeof LOGOUT_USER_SUCCESS;
    readonly message: string;
}
export interface ILogoutUserFailedAction {
    readonly type: typeof LOGOUT_USER_FAILED;
}

export type TAccessAction = 
    ISetNameAction |
    ISetEmailAction |
    ISetLoginAction |
    ISetPasswordAction |
    ISetRestoreEmailAction |
    IRegisterUserRequestAction |
    IRegisterUserSuccessAction |
    IRegisterUserFailedAction |
    ILoginUserRequestAction |
    ILoginUserSuccessAction |
    ILoginUserFailedAction |
    IUpdateUserDataRequestAction |
    IUpdateUserDataSuccessAction |
    IUpdateUserDataFailedAction |
    ICancelUpdateUserDataAction |
    IRestorePasswordRequestAction |
    IRestorePasswordSuccessAction |
    IRestorePasswordFailedAction |
    IGetNewPasswordRequestAction |
    IGetNewPasswordSuccessAction |
    IGetNewPasswordFailedAction |
    ISetNewPasswordAction |
    ISetRestoreCodeAction |
    IRefreshTokenRequestAction |
    IRefreshTokenSuccessAction |
    IRefreshTokenFailedAction |
    ILogoutUserRequestAction |
    ILogoutUserSuccessAction |
    ILogoutUserFailedAction;