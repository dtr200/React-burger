import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SEND_ORDER
} from '../action-constants/ws';

import { TWSOrder, TWSOrdersResponse } from '../../utils/types';

export interface IConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
}
export interface IConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IGetOrdersAction {
    readonly type: typeof WS_GET_ORDERS;
    readonly payload: TWSOrdersResponse;
}
export interface ISendOrderAction {
    readonly type: typeof WS_SEND_ORDER;
    readonly payload: TWSOrder;
}

export type TWSOrdersActions = 
    IConnectionStartAction |
    IConnectionSuccessAction |
    IConnectionErrorAction |
    IConnectionClosedAction |
    IGetOrdersAction |
    ISendOrderAction;