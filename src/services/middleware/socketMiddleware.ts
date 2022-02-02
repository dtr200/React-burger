import type { Middleware, MiddlewareAPI } from "redux";
import type { AppDispatch, RootState } from '../types';

import { TWSActions } from '../../utils/types';
import { TWSOrdersActions } from "../actions/ws";
import { TApplicationActions } from '../types';
import { parse } from "path";

export const socketMiddleware = (wsActions: TWSActions): Middleware => {
    return ((store: MiddlewareAPI) => {
        let socket: WebSocket | null = null;

        return next => (action) => {
            const { dispatch } = store;
            const { 
                wsInit, wsSendOrder, onOpen, onClose, onError, onMessage 
            } = wsActions;
            const { type, payload } = action;

            if(type === wsInit){
                socket = new WebSocket(payload);
            }
            if(socket){
                socket.onopen = e => {
                    dispatch({
                        type: onOpen,
                        payload: e
                    });
                };
                socket.onerror = e => {
                    dispatch({
                        type: onError,
                        payload: e
                    });
                };
                socket.onmessage = e => {
                    const { data } = e;
                    const parsedData = JSON.parse(data);
                    const { success, ...rest } = parsedData;
                    dispatch({
                        type: onMessage,
                        payload: rest
                    });
                };
                socket.onclose = e => {
                    dispatch({
                        type: onClose,
                        payload: e
                    });
                };
                
                if(type === wsSendOrder){
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }
            next(action);
        };
    }) as Middleware;
}