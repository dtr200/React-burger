import {
    SET_MODAL_DATA,
    SET_MODAL_ERROR,
    CLOSE_MODAL
} from '../action-constants/modal';

export interface ISetModalDataAction {
    readonly type: typeof SET_MODAL_DATA;
    readonly mode: string;
    readonly title: string;
    readonly data: undefined;
}
export interface ISetModalErrorAction {
    readonly type: typeof SET_MODAL_ERROR;
}
export interface ICloseModalAction {
    readonly type: typeof CLOSE_MODAL;
}

export type TModalAction = 
    ISetModalDataAction |
    ISetModalErrorAction |
    ICloseModalAction;