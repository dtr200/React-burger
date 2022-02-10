import { TOrderResponseData } from '../../utils/types';

import {
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    RESET_ORDER_REQUEST
} from '../action-constants/order';

export interface ISendOrderRequestAction {
    readonly type: typeof SEND_ORDER_REQUEST;
}
export interface ISendOrderSuccessAction {
    readonly type: typeof SEND_ORDER_SUCCESS;
    readonly data: TOrderResponseData;
}
export interface ISendOrderFailedAction {
    readonly type: typeof SEND_ORDER_FAILED;
}
export interface IResetOrderRequestAction {
    readonly type: typeof RESET_ORDER_REQUEST;
}
export interface IDefaultOrderAction {
    readonly type: '';
}

export type TOrderAction = 
    ISendOrderRequestAction |
    ISendOrderSuccessAction |
    ISendOrderFailedAction |
    IResetOrderRequestAction | 
    IDefaultOrderAction;