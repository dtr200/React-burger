import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS
} from '../action-constants/ws';

import { TWSOrder, TWSOrdersResponse } from '../../utils/types';
import { TWSOrdersActions } from '../actions/ws';
import { restorePassword } from '../thunks/access';

type TWSState = {
    wsConnected: boolean;
    orders: TWSOrder[];
    total: number;
    totalToday: number;
    error?: Event;
};
  
const initialState: TWSState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

export default (state = initialState, action: TWSOrdersActions): TWSState => {
    switch(action.type){
        case WS_CONNECTION_START: {
            return {
                ...state,                
            }
        }
        case WS_CONNECTION_SUCCESS: {
            return {
                ...state,
                wsConnected: true
            }
        }
        case WS_CONNECTION_ERROR: {
            return {
                ...state,
                wsConnected: false
            }
        }
        case WS_CONNECTION_CLOSED: {
            return {
                ...state,
                wsConnected: false
            }
        }
        case WS_GET_ORDERS: {
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            }
        }
        default: return state;
    }
}