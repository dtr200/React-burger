import ws from './ws';

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS
} from '../action-constants/ws';

import { initialState } from './ws';

describe('ws reducer', () => {
    it('should return the initial state', () => {
        expect(ws(undefined, { type: '' })).toEqual(initialState)
    })
    it('should handle WS_CONNECTION_START', () => {
        expect(ws(undefined, { type: WS_CONNECTION_START })).toEqual(initialState)
    })
    it('should handle WS_CONNECTION_START', () => {
        const state = {
            ...initialState,
            wsConnected: true
        }
        expect(ws(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual(state)
    })
    it('should handle WS_CONNECTION_ERROR', () => {
        const state = {
            ...initialState,
            wsConnected: false
        }
        expect(ws(undefined, { type: WS_CONNECTION_ERROR })).toEqual(state)
    })
    it('should handle WS_CONNECTION_CLOSED', () => {
        const state = {
            ...initialState,
            wsConnected: false
        }
        expect(ws(undefined, { type: WS_CONNECTION_CLOSED })).toEqual(state)
    })
    it('should handle WS_GET_ORDERS', () => {
        const payload = {
            orders: [],
            total: 0,
            totalToday: 0,
        }
        const state = {
            ...initialState,
            orders: [],
            total: 0,
            totalToday: 0
        }
        expect(ws(undefined, { type: WS_GET_ORDERS, payload })).toEqual(state)
    })
})